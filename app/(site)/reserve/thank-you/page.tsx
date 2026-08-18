import type { Metadata } from "next";
import Link from "next/link";
import { ReservationComplete } from "@/components/ReservationComplete";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reservation received",
};

export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-20 text-center">
      <ReservationComplete />
      <p className="text-6xl">🐾</p>
      <h1 className="mt-6 font-display text-4xl font-semibold text-ink-900">
        Reservation received!
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-500">
        Thank you! Your request is in our inbox. We'll get back to you within
        24 hours to talk through the next steps. Keep an eye on your email (and
        your spam folder, just in case).
      </p>
      <p className="mt-3 text-lg leading-relaxed text-ink-500">
        You're welcome to come and meet your kitten in person. Visits are by
        appointment and there is a small visitation fee, so just let us know
        when you'd like to come and we'll set it up.
      </p>
      <p className="mt-3 text-ink-500">
        Can't wait? Text us at{" "}
        <a href="sms:+13323184580" className="font-bold text-moss-600 hover:text-moss-700">
          {site.phone}
        </a>{" "}
        or message us on{" "}
        <a href={site.whatsappLink} target="_blank" rel="noreferrer" className="font-bold text-moss-600 hover:text-moss-700">
          WhatsApp
        </a>
        .
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/kittens"
          className="rounded-xl bg-clay-500 px-7 py-3.5 font-bold text-white transition-colors hover:bg-clay-600"
        >
          Keep browsing
        </Link>
        <Link
          href="/"
          className="rounded-xl border border-cream-300 bg-white px-7 py-3.5 font-bold text-ink-700 transition-colors hover:bg-cream-100"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
