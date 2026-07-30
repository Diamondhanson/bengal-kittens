import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Gallery } from "@/components/Gallery";
import { StatusBadge } from "@/components/StatusBadge";
import { getKittenBySlug } from "@/lib/data";
import { formatPrice } from "@/lib/site";
import { formatAge, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function KittenDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const kitten = await getKittenBySlug(slug);
  if (!kitten) notFound();

  const facts: [string, string][] = [
    ["Breed", kitten.breed],
    ["Gender", kitten.gender === "female" ? "Female" : "Male"],
    ["Color", kitten.color],
    ["Born", `${formatDate(kitten.date_of_birth)} (${formatAge(kitten.date_of_birth)})`],
    ["Temperament", kitten.temperament],
    ["Vaccinated", kitten.vaccinated ? "Yes, up to date" : "Not yet"],
    ["Litter trained", kitten.litter_trained ? "Yes" : "In progress"],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 lg:py-16">
      <nav className="text-sm text-ink-400">
        <Link href="/kittens" className="hover:text-clay-600">
          Available Kittens
        </Link>{" "}
        / <span className="text-ink-700">{kitten.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <Gallery
          images={kitten.images}
          alt={`${kitten.name}, a ${kitten.breed} kitten`}
        />

        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-4xl font-semibold text-ink-900">
              {kitten.name}
            </h1>
            <StatusBadge status={kitten.status} />
          </div>
          <p className="mt-2 text-ink-500">
            {kitten.breed} · {kitten.gender === "female" ? "Girl" : "Boy"} ·{" "}
            {formatAge(kitten.date_of_birth)}
          </p>
          <p className="mt-4 font-display text-3xl font-semibold text-clay-600">
            {formatPrice(kitten.price)}
          </p>

          <p className="mt-6 leading-relaxed text-ink-700">{kitten.description}</p>

          <dl className="mt-8 divide-y divide-cream-200 rounded-2xl border border-cream-300 bg-white">
            {facts.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 px-5 py-3 text-sm">
                <dt className="font-bold text-ink-400">{label}</dt>
                <dd className="text-right text-ink-700">{value}</dd>
              </div>
            ))}
          </dl>

          {kitten.health_notes && (
            <div className="mt-6 rounded-2xl bg-moss-100/70 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-moss-700">
                🩺 Health record
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                {kitten.health_notes}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <AddToCartButton kitten={kitten} size="lg" goToCart />
            <Link
              href="/contact"
              className="rounded-xl border border-cream-300 bg-white px-6 py-3 font-bold text-ink-700 transition-colors hover:bg-cream-100"
            >
              Ask about {kitten.name}
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink-400">
            Reserving is free and non-binding — we'll contact you within 24
            hours to arrange everything personally.
          </p>
        </div>
      </div>
    </div>
  );
}
