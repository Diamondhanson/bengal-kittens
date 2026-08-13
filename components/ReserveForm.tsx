"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { useCart } from "@/components/CartProvider";
import { submitOrder, type OrderFormState } from "@/app/actions/orders";
import { SubmitButton } from "./SubmitButton";
import { formatPrice } from "@/lib/site";

const inputClass =
  "w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-200";

export function ReserveForm() {
  const { items } = useCart();
  const [state, action] = useActionState<OrderFormState, FormData>(
    submitOrder,
    {}
  );
  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-cream-300 bg-white p-12 text-center">
        <p className="text-4xl">🧺</p>
        <p className="mt-4 font-display text-xl text-ink-700">
          Your basket is empty
        </p>
        <p className="mt-2 text-ink-500">
          Add a kitten to your basket before reserving.
        </p>
        <Link
          href="/kittens"
          className="mt-6 inline-block rounded-xl bg-clay-500 px-7 py-3.5 font-bold text-white transition-colors hover:bg-clay-600"
        >
          Browse kittens
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <form action={action} className="space-y-5">
        <input
          type="hidden"
          name="kitten_ids"
          value={JSON.stringify(items.map((item) => item.id))}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-bold text-ink-700">
              Full name *
            </label>
            <input id="name" name="name" required className={inputClass} placeholder="Jane Doe" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-ink-700">
              Email *
            </label>
            <input id="email" name="email" type="email" required className={inputClass} placeholder="jane@example.com" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-bold text-ink-700">
              Phone
            </label>
            <input id="phone" name="phone" type="tel" className={inputClass} placeholder="Your phone number" />
          </div>
          <div>
            <label htmlFor="city" className="mb-1.5 block text-sm font-bold text-ink-700">
              City
            </label>
            <input id="city" name="city" className={inputClass} placeholder="Your city" />
          </div>
          <div>
            <label htmlFor="state" className="mb-1.5 block text-sm font-bold text-ink-700">
              State
            </label>
            <input id="state" name="state" className={inputClass} placeholder="OR" />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-bold text-ink-700">
            Tell us about your home (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={inputClass}
            placeholder="Kids, other pets, experience with cats, questions for us…"
          />
        </div>

        {state.error && (
          <p className="rounded-xl bg-clay-100 px-4 py-3 text-sm font-semibold text-clay-700">
            {state.error}
          </p>
        )}

        <SubmitButton pendingText="Sending reservation…">
          Send reservation request
        </SubmitButton>
        <p className="text-sm text-ink-400">
          Free and non-binding, with no payment online. We'll contact you within 24
          hours.
        </p>
      </form>

      <aside className="h-fit rounded-2xl border border-cream-300 bg-white p-6">
        <h2 className="font-display text-xl font-semibold text-ink-900">
          Your kittens
        </h2>
        <ul className="mt-4 space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-cream-200">
                {item.image && (
                  <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink-900">{item.name}</p>
                <p className="text-xs text-ink-400">{item.breed}</p>
              </div>
              <p className="text-sm font-bold text-clay-600">
                {formatPrice(item.price)}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between border-t border-cream-200 pt-4">
          <p className="font-bold text-ink-500">Total</p>
          <p className="font-display text-xl font-semibold text-ink-900">
            {formatPrice(total)}
          </p>
        </div>
      </aside>
    </div>
  );
}
