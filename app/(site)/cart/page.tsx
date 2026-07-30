"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/site";

export default function CartPage() {
  const { items, removeItem } = useCart();
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 lg:py-16">
      <h1 className="font-display text-4xl font-semibold text-ink-900">
        Your basket
      </h1>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-cream-300 bg-white p-12 text-center">
          <p className="text-4xl">🧺</p>
          <p className="mt-4 font-display text-xl text-ink-700">
            Your basket is empty
          </p>
          <p className="mt-2 text-ink-500">
            Go meet the kittens — one of them is waiting for you.
          </p>
          <Link
            href="/kittens"
            className="mt-6 inline-block rounded-xl bg-clay-500 px-7 py-3.5 font-bold text-white transition-colors hover:bg-clay-600"
          >
            Browse kittens
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-5 rounded-2xl border border-cream-300 bg-white p-4"
              >
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-cream-200">
                  {item.image && (
                    <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/kittens/${item.slug}`}
                    className="font-display text-lg font-semibold text-ink-900 hover:text-clay-600"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-ink-500">{item.breed}</p>
                </div>
                <p className="font-display text-lg font-semibold text-clay-600">
                  {formatPrice(item.price)}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="rounded-lg px-3 py-2 text-sm font-bold text-ink-400 transition-colors hover:bg-cream-100 hover:text-clay-600"
                  aria-label={`Remove ${item.name}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-cream-100 px-6 py-5">
            <p className="text-ink-500">
              Total{" "}
              <span className="ml-2 font-display text-2xl font-semibold text-ink-900">
                {formatPrice(total)}
              </span>
            </p>
            <Link
              href="/reserve"
              className="rounded-xl bg-clay-500 px-8 py-3.5 font-bold text-white transition-colors hover:bg-clay-600"
            >
              Reserve now →
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink-400">
            No payment is taken online. Reserving sends us your request — we'll
            reply within 24 hours to arrange everything personally.
          </p>
        </>
      )}
    </div>
  );
}
