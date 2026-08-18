import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

// Cap how long a CDN copy of this page can outlive a deploy. Without it
// Next emits s-maxage=31536000 and stale contact details can linger.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Our In-Home Bengal Cattery",
  description:
    "We're a small family cattery raising Bengal kittens in our living room, never in cages. Genetically screened parents, early socialization with kids and dogs, and lifetime support for every adopter.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 lg:py-16">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink-900">
            Our little cattery, our big family
          </h1>
          <p className="mt-6 leading-relaxed text-ink-700">
            {site.name} began with one impossibly curious Bengal kitten and a
            promise: that every cat we raise would grow up the way she did: in
            a warm home, underfoot in the kitchen, napping in sunbeams, and
            handled with love every single day.
          </p>
          <p className="mt-4 leading-relaxed text-ink-700">
            Today we specialize in Bengals while also raising a small number of
            Siamese, British Shorthair, and Maine Coon litters each year. We
            keep things intentionally small so that every kitten gets
            individual attention, early socialization with children and dogs,
            and the very best veterinary care.
          </p>
          <p className="mt-4 leading-relaxed text-ink-700">
            When you adopt from us, you're not buying from a facility. You're
            welcoming a kitten who already knows what it means to be part of a
            family.
          </p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1561948955-570b270e7c36?w=1200&q=75&fit=crop"
            alt="One of our cats at home"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Raised in our living room",
            text: "No cages, no kennels. Our kittens are born in a nursery next to our bedroom and graduate to full run of the house.",
          },
          {
            title: "Health comes first",
            text: "All parent cats are genetically screened. Kittens see our vet at least twice, are vaccinated and dewormed on schedule, and go home with a written guarantee.",
          },
          {
            title: "Support for life",
            text: "Adopters get our personal phone number. Diet questions at week two or behavior questions at year five, we're always here.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-cream-300 bg-white p-7">
            <h2 className="font-display text-xl font-semibold text-ink-900">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
