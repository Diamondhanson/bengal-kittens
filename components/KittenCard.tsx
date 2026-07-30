import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";
import { StatusBadge } from "./StatusBadge";
import { formatPrice } from "@/lib/site";
import { formatAge } from "@/lib/utils";
import type { Kitten } from "@/lib/types";

export function KittenCard({ kitten }: { kitten: Kitten }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
      <Link
        href={`/kittens/${kitten.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-cream-200"
      >
        {kitten.images[0] && (
          <Image
            src={kitten.images[0]}
            alt={`${kitten.name}, a ${kitten.breed} kitten`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute left-3 top-3">
          <StatusBadge status={kitten.status} />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-xl font-semibold text-ink-900">
            <Link href={`/kittens/${kitten.slug}`} className="hover:text-clay-600">
              {kitten.name}
            </Link>
          </h3>
          <p className="font-display text-lg font-semibold text-clay-600">
            {formatPrice(kitten.price)}
          </p>
        </div>
        <p className="mt-1 text-sm text-ink-500">
          {kitten.breed} · {kitten.gender === "female" ? "Girl" : "Boy"} ·{" "}
          {formatAge(kitten.date_of_birth)}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-500">
          {kitten.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3 pt-2">
          <Link
            href={`/kittens/${kitten.slug}`}
            className="group/link text-sm font-bold text-moss-600 hover:text-moss-700"
          >
            Meet {kitten.name}{" "}
            <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
              →
            </span>
          </Link>
          <AddToCartButton kitten={kitten} />
        </div>
      </div>
    </article>
  );
}
