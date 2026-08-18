import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | Ask About Our Kittens",
  description:
    "Questions about a Bengal kitten for sale, booking a visit, or joining the waitlist? Message us on WhatsApp, email, or the contact form. We reply within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 lg:py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h1 className="font-display text-4xl font-semibold text-ink-900">
            Say hello 👋
          </h1>
          <p className="mt-4 leading-relaxed text-ink-500">
            Questions about a kitten, visits, or upcoming litters? Send us a
            note and we'll reply within 24 hours.
          </p>
          <dl className="mt-8 space-y-5 text-sm">
            <div>
              <dt className="font-bold uppercase tracking-wide text-ink-400">
                Text &amp; WhatsApp
              </dt>
              <dd className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <a
                  href="sms:+13323184580"
                  className="font-semibold text-ink-700 hover:text-clay-600"
                >
                  {site.phone}
                </a>
                <a
                  href={site.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-moss-600 hover:text-moss-700"
                >
                  💬 Message on WhatsApp
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-wide text-ink-400">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-clay-600 hover:text-clay-700"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-wide text-ink-400">Visits by appointment</dt>
              <dd className="mt-1 text-ink-700">{site.hours}</dd>
              <dd className="text-ink-700">
                Location shared when you book a visit.
              </dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-wide text-ink-400">Find us on</dt>
              <dd className="mt-1 flex flex-wrap gap-4">
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-clay-600 hover:text-clay-700"
                >
                  Facebook
                </a>
                <a
                  href={site.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-clay-600 hover:text-clay-700"
                >
                  WhatsApp
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="rounded-3xl border border-cream-300 bg-white p-7 sm:p-9 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
