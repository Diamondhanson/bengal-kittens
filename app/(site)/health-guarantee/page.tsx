import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Health Guarantee & Policies",
};

export default function HealthGuaranteePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 lg:py-16">
      <h1 className="font-display text-4xl font-semibold text-ink-900">
        Health guarantee & policies
      </h1>
      <p className="mt-3 text-ink-500">
        Plain-language promises we put in writing with every adoption.
      </p>

      <div className="mt-10 space-y-8">
        <section className="rounded-2xl border border-cream-300 bg-white p-7">
          <h2 className="font-display text-2xl font-semibold text-ink-900">🩺 Our health guarantee</h2>
          <ul className="mt-4 space-y-3 text-ink-700 leading-relaxed list-disc pl-5">
            <li>Every kitten is examined by our licensed veterinarian at least twice before going home.</li>
            <li>Kittens leave with age-appropriate FVRCP vaccinations, deworming, and a complete written health record.</li>
            <li>All parent cats are genetically screened for the conditions relevant to their breed (e.g. PK-def and PRA-b for Bengals, HCM echocardiogram screening for Maine Coons).</li>
            <li>We guarantee against life-threatening congenital and genetic conditions for <strong>two years</strong>. If one is diagnosed, we will offer a replacement kitten or refund of the adoption fee.</li>
            <li>You have <strong>72 hours</strong> after pickup to have your kitten examined by your own vet. If a serious pre-existing condition is found, we'll take the kitten back with a full refund.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-cream-300 bg-white p-7">
          <h2 className="font-display text-2xl font-semibold text-ink-900">📋 Adoption policies</h2>
          <ul className="mt-4 space-y-3 text-ink-700 leading-relaxed list-disc pl-5">
            <li>Kittens go home at 12–14 weeks, never earlier.</li>
            <li>A reservation holds your kitten once we've spoken and a deposit is arranged; deposits are applied to the adoption fee.</li>
            <li>All kittens are sold as loved pets. Breeding rights are available only by separate agreement.</li>
            <li>Kittens must live indoors (or with safe supervised outdoor access such as a catio).</li>
            <li>If you can ever no longer keep your cat — at any age, for any reason — they come back to us. Our cats never go to shelters.</li>
          </ul>
        </section>

        <section className="rounded-2xl bg-moss-100/70 p-7">
          <h2 className="font-display text-2xl font-semibold text-ink-900">🤝 Our promise to you</h2>
          <p className="mt-3 leading-relaxed text-ink-700">
            Adopting a kitten is a 15+ year commitment, and we treat it that
            way. We'll always tell you honestly about each kitten's personality
            and needs, we'll stay reachable for the life of your cat, and we'll
            celebrate every photo you send us. That's what family means.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-xl bg-clay-500 px-6 py-3 font-bold text-white transition-colors hover:bg-clay-600"
          >
            Questions? Ask away
          </Link>
        </section>
      </div>
    </div>
  );
}
