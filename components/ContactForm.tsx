"use client";

import { useActionState } from "react";
import { submitContact, type ContactFormState } from "@/app/actions/contact";
import { SubmitButton } from "./SubmitButton";

const inputClass =
  "w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-200";

export function ContactForm() {
  const [state, action] = useActionState<ContactFormState, FormData>(
    submitContact,
    {}
  );

  if (state.success) {
    return (
      <div className="rounded-2xl bg-moss-100 p-8 text-center">
        <p className="text-4xl">💌</p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900">
          Message sent!
        </h2>
        <p className="mt-2 text-ink-500">
          Thank you for reaching out — we'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-bold text-ink-700">
            Your name *
          </label>
          <input id="name" name="name" required className={inputClass} placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-ink-700">
            Email *
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="jane@example.com" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-bold text-ink-700">
            Phone (optional)
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} placeholder="(555) 123-4567" />
        </div>
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-bold text-ink-700">
            Subject
          </label>
          <input id="subject" name="subject" className={inputClass} placeholder="Visiting, waitlist, a specific kitten…" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-bold text-ink-700">
          Message *
        </label>
        <textarea id="message" name="message" required rows={5} className={inputClass} placeholder="Tell us how we can help…" />
      </div>

      {state.error && (
        <p className="rounded-xl bg-clay-100 px-4 py-3 text-sm font-semibold text-clay-700">
          {state.error}
        </p>
      )}

      <SubmitButton pendingText="Sending…">Send message</SubmitButton>
    </form>
  );
}
