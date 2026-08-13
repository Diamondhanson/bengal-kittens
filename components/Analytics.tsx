"use client";

import Script from "next/script";
import { useEffect } from "react";
import { ADS_ID, GA_ID, analyticsEnabled, track } from "@/lib/gtag";

/**
 * Loads the Google tag (GA4 and/or Google Ads) once the page is interactive,
 * and tracks WhatsApp link clicks globally. Renders nothing until the
 * NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_GOOGLE_ADS_ID env vars are set.
 */
export function Analytics() {
  useEffect(() => {
    if (!analyticsEnabled) return;
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest?.('a[href*="wa.me"]')) {
        track("whatsapp_click");
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  if (!analyticsEnabled) return null;

  const primaryId = GA_ID || ADS_ID;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${GA_ID ? `gtag('config', '${GA_ID}');` : ""}
          ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ""}
        `}
      </Script>
    </>
  );
}
