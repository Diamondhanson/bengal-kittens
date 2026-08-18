import type { Metadata } from "next";
import { ReserveForm } from "@/components/ReserveForm";

// Cap how long a CDN copy of this page can outlive a deploy. Without it
// Next emits s-maxage=31536000 and stale contact details can linger.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Reserve",
};

export default function ReservePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 lg:py-16">
      <h1 className="font-display text-4xl font-semibold text-ink-900">
        Reserve your kitten
      </h1>
      <p className="mt-3 max-w-2xl text-ink-500 leading-relaxed">
        Tell us a little about yourself and we'll take it from there. Your
        request goes straight to our inbox and we reply within 24 hours.
      </p>
      <div className="mt-10">
        <ReserveForm />
      </div>
    </div>
  );
}
