"use client";

import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";
import { ADS_RESERVATION_LABEL, track, trackAdsConversion } from "@/lib/gtag";

/**
 * Runs once on the reservation thank-you page: reports the conversion (with
 * the basket value) and then empties the basket. A refresh of the page fires
 * nothing because the basket is already empty by then.
 */
export function ReservationComplete() {
  const { clear } = useCart();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    try {
      const raw = localStorage.getItem("bk-cart");
      // Remove immediately: this effect runs before the CartProvider reads
      // storage on mount, so leaving the key would let it repopulate the
      // basket right after clear().
      localStorage.removeItem("bk-cart");
      const items: { name: string; price: number }[] = raw
        ? JSON.parse(raw)
        : [];
      if (items.length > 0) {
        const value = items.reduce((sum, item) => sum + (item.price || 0), 0);
        track("reservation_submitted", {
          value,
          currency: "USD",
          items: items.length,
        });
        trackAdsConversion(ADS_RESERVATION_LABEL, value);
      }
    } catch {
      // basket unreadable; nothing to report
    }
    clear();
  }, [clear]);

  return null;
}
