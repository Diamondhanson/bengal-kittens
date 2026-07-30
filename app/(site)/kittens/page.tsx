import type { Metadata } from "next";
import Link from "next/link";
import { KittenCard } from "@/components/KittenCard";
import { getBreeds, getKittens } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Available Kittens",
};

export default async function KittensPage({
  searchParams,
}: {
  searchParams: Promise<{ breed?: string }>;
}) {
  const { breed } = await searchParams;
  const [kittens, breeds] = await Promise.all([
    getKittens(breed),
    getBreeds(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 lg:py-16">
      <h1 className="font-display text-4xl font-semibold text-ink-900">
        Available Kittens
      </h1>
      <p className="mt-3 max-w-2xl text-ink-500 leading-relaxed">
        Every kitten below was born and raised in our home. Click through to
        read their personality profile, health record, and photos, then
        reserve your favorite before someone else falls in love first.
      </p>

      {/* Breed filter */}
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/kittens"
          className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
            !breed
              ? "bg-clay-500 text-white"
              : "bg-white border border-cream-300 text-ink-500 hover:bg-cream-100"
          }`}
        >
          All breeds
        </Link>
        {breeds.map((b) => (
          <Link
            key={b}
            href={`/kittens?breed=${encodeURIComponent(b)}`}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              breed === b
                ? "bg-clay-500 text-white"
                : "bg-white border border-cream-300 text-ink-500 hover:bg-cream-100"
            }`}
          >
            {b}
          </Link>
        ))}
      </div>

      {kittens.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-cream-300 bg-white p-12 text-center">
          <p className="text-4xl">🐱</p>
          <p className="mt-4 font-display text-xl text-ink-700">
            No kittens in this breed right now
          </p>
          <p className="mt-2 text-ink-500">
            New litters arrive regularly.{" "}
            <Link href="/contact" className="font-bold text-clay-600">
              Get in touch
            </Link>{" "}
            to join the waitlist.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {kittens.map((kitten) => (
            <KittenCard key={kitten.id} kitten={kitten} />
          ))}
        </div>
      )}
    </div>
  );
}
