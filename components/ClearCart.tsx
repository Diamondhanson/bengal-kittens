"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";

/** Empties the basket once the reservation was successfully submitted. */
export function ClearCart() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
