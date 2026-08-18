import "server-only";
import { Resend } from "resend";
import { isResendConfigured } from "./supabase/config";
import { formatPrice, site } from "./site";
import type { NewContact, NewOrder } from "./data";

function getResend(): Resend | null {
  if (!isResendConfigured()) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Inbox that receives order + contact notifications. Separate from ADMIN_EMAIL
 * (the dashboard login) so the two can be moved independently.
 */
function adminEmail(): string {
  return (
    process.env.NOTIFICATION_EMAIL ||
    process.env.ADMIN_EMAIL ||
    "bengalkittenhaven@gmail.com"
  );
}

function fromEmail(): string {
  return process.env.RESEND_FROM_EMAIL || `${site.name} <onboarding@resend.dev>`;
}

const wrap = (title: string, body: string) => `
  <div style="font-family:Georgia,serif;background:#fdfbf7;padding:32px 16px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #eaddc6;">
      <div style="background:#d16a42;color:#fff;padding:20px 28px;">
        <h1 style="margin:0;font-size:20px;">🐾 ${site.name}</h1>
      </div>
      <div style="padding:28px;color:#35281e;font-size:15px;line-height:1.6;">
        <h2 style="margin-top:0;font-size:18px;">${title}</h2>
        ${body}
      </div>
      <div style="padding:16px 28px;background:#faf5ec;color:#8a7767;font-size:12px;">
        Sent automatically by the ${site.name} website.
      </div>
    </div>
  </div>`;

const row = (label: string, value: string) =>
  `<tr>
    <td style="padding:6px 12px 6px 0;color:#8a7767;white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;">${value}</td>
  </tr>`;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Emails the admin about a new reservation. Silently skips if Resend isn't configured. */
export async function sendOrderNotification(order: NewOrder): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.log("[preview] Resend not configured; order email skipped.");
    return;
  }
  const total = order.items.reduce((sum, item) => sum + item.price, 0);
  const itemsHtml = order.items
    .map(
      (item) =>
        `<li>${escapeHtml(item.kitten_name)} (${escapeHtml(
          item.kitten_breed
        )}) · <strong>${formatPrice(item.price)}</strong></li>`
    )
    .join("");

  const html = wrap(
    "New kitten reservation 🎉",
    `<table style="border-collapse:collapse;">
      ${row("Customer", escapeHtml(order.customer_name))}
      ${row("Email", escapeHtml(order.email))}
      ${row("Phone", escapeHtml(order.phone) || "-")}
      ${row("Location", escapeHtml([order.city, order.state].filter(Boolean).join(", ")) || "-")}
    </table>
    <p style="margin:16px 0 4px;color:#8a7767;">Kittens requested</p>
    <ul style="margin:0 0 16px;padding-left:20px;">${itemsHtml}</ul>
    <p style="margin:0 0 16px;"><strong>Total: ${formatPrice(total)}</strong></p>
    ${
      order.message
        ? `<p style="margin:0 0 4px;color:#8a7767;">Message from the customer</p>
           <p style="margin:0;background:#faf5ec;border-radius:8px;padding:12px;">${escapeHtml(order.message)}</p>`
        : ""
    }
    <p style="margin-top:20px;">Reply to the customer at
      <a href="mailto:${escapeHtml(order.email)}" style="color:#d16a42;">${escapeHtml(order.email)}</a>
      to arrange payment and pickup.</p>`
  );

  const { error } = await resend.emails.send({
    from: fromEmail(),
    to: adminEmail(),
    replyTo: order.email,
    subject: `New reservation from ${order.customer_name} (${formatPrice(total)})`,
    html,
  });
  if (error) throw new Error(`Failed to send order email: ${error.message}`);

  // Best-effort confirmation to the customer. On Resend's sandbox sender this
  // only delivers to your own address, so failures here are not fatal.
  try {
    await resend.emails.send({
      from: fromEmail(),
      to: order.email,
      subject: `We received your reservation - ${site.name}`,
      html: wrap(
        "Thank you for your reservation! 🐱",
        `<p>Hi ${escapeHtml(order.customer_name)},</p>
         <p>We've received your reservation request and will get back to you
         within 24 hours to arrange the next steps.</p>
         <ul style="padding-left:20px;">${itemsHtml}</ul>
         <p>Questions in the meantime? Just reply to this email, or call / WhatsApp us at ${site.whatsapp}.</p>
         <p>Warm purrs,<br/>The ${site.name} family</p>`
      ),
    });
  } catch {
    // ignore; sandbox senders can't reach arbitrary recipients
  }
}

/** Emails the admin about a new contact-form message. */
export async function sendContactNotification(
  contact: NewContact
): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.log("[preview] Resend not configured; contact email skipped.");
    return;
  }
  const html = wrap(
    "New message from the contact form ✉️",
    `<table style="border-collapse:collapse;">
      ${row("Name", escapeHtml(contact.name))}
      ${row("Email", escapeHtml(contact.email))}
      ${row("Phone", escapeHtml(contact.phone) || "-")}
      ${row("Subject", escapeHtml(contact.subject) || "-")}
    </table>
    <p style="margin:16px 0 4px;color:#8a7767;">Message</p>
    <p style="margin:0;background:#faf5ec;border-radius:8px;padding:12px;">${escapeHtml(contact.message)}</p>`
  );

  const { error } = await resend.emails.send({
    from: fromEmail(),
    to: adminEmail(),
    replyTo: contact.email,
    subject: `Contact form: ${contact.subject || contact.name}`,
    html,
  });
  if (error) throw new Error(`Failed to send contact email: ${error.message}`);
}
