import type { Metadata } from "next";
import Link from "next/link";
import { KittenCard } from "@/components/KittenCard";
import { getBreeds, getKittens } from "@/lib/data";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ breed?: string }>;
}): Promise<Metadata> {
  const { breed } = await searchParams;
  const title = breed
    ? `${breed} Kittens for Sale`
    : "Available Kittens for Sale";
  const description = breed
    ? `${breed} kittens for sale from our family-run home cattery. Vet-checked, vaccinated, and socialized with love. See photos, personalities, and prices, then reserve online.`
    : "Browse our available kittens for sale, raised in our home and socialized with children and pets. See photos, personalities, health records, and prices, then reserve your favorite online.";
  const canonical = breed
    ? `/kittens?breed=${encodeURIComponent(breed)}`
    : "/kittens";
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  };
}

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

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: breed ? `${breed} kittens for sale` : "Kittens for sale",
    numberOfItems: kittens.length,
    itemListElement: kittens.map((kitten, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${kitten.name} the ${kitten.breed} kitten`,
      url: `${site.url}/kittens/${kitten.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <h1 className="font-display text-4xl font-semibold text-ink-900">
        {breed ? `${breed} Kittens for Sale` : "Available Kittens"}
      </h1>
      <p className="mt-3 max-w-2xl text-ink-500 leading-relaxed">
        Every kitten for sale below was born and raised in our home. Click
        through to read their personality profile, health record, and photos,
        then reserve your favorite before someone else falls in love first.
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
