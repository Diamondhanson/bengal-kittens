import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
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
              <dt className="font-bold uppercase tracking-wide text-ink-400">WhatsApp</dt>
              <dd className="mt-1">
                <a
                  href={site.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-moss-600 hover:text-moss-700"
                >
                  💬 {site.whatsapp}
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
              <dt className="font-bold uppercase tracking-wide text-ink-400">Phone</dt>
              <dd className="mt-1 text-ink-700">{site.phone}</dd>
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
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-clay-600 hover:text-clay-700"
                >
                  Instagram
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
