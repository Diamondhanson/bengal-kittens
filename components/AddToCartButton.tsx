"use client";

import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
import { track } from "@/lib/gtag";
import type { Kitten } from "@/lib/types";

export function AddToCartButton({
  kitten,
  size = "md",
  goToCart = false,
}: {
  kitten: Pick<Kitten, "id" | "slug" | "name" | "breed" | "price" | "images" | "status">;
  size?: "md" | "lg";
  goToCart?: boolean;
}) {
  const { addItem, has } = useCart();
  const router = useRouter();
  const inCart = has(kitten.id);
  const disabled = kitten.status !== "available";

  const classes =
    size === "lg"
      ? "px-6 py-3 text-base rounded-xl"
      : "px-4 py-2 text-sm rounded-lg";

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className={`${classes} font-bold bg-cream-200 text-ink-400 cursor-not-allowed`}
      >
        {kitten.status === "reserved" ? "Reserved" : "Adopted"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (!inCart) {
          track("add_to_cart", {
            currency: "USD",
            value: kitten.price,
            items: [{ item_name: kitten.name, item_category: kitten.breed }],
          });
          addItem({
            id: kitten.id,
            slug: kitten.slug,
            name: kitten.name,
            breed: kitten.breed,
            price: kitten.price,
            image: kitten.images[0] ?? "",
          });
        }
        if (goToCart || inCart) router.push("/cart");
      }}
      className={`${classes} font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95 ${
        inCart ? "bg-moss-600 hover:bg-moss-700" : "bg-clay-500 hover:bg-clay-600"
      }`}
    >
      {inCart ? "In basket ✓" : goToCart ? "Reserve me" : "Add to basket"}
    </button>
  );
}
