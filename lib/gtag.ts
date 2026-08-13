// Google tag (GA4 + Google Ads) helpers. Everything no-ops until the
// NEXT_PUBLIC_* IDs below are set, so there is zero cost while unset.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
export const ADS_RESERVATION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_RESERVATION_LABEL || "";
export const ADS_CONTACT_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL || "";

export const analyticsEnabled = Boolean(GA_ID || ADS_ID);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Pushes straight onto dataLayer rather than calling window.gtag, because the
 * Google tag script loads asynchronously. An event fired on page load (a
 * conversion, for example) would otherwise be dropped when window.gtag does
 * not exist yet. dataLayer is a plain array, so anything queued before the
 * script arrives is processed once it loads.
 */
function push(
  _command: "event",
  _name: string,
  _params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // Google's own snippet pushes the `arguments` object, and gtag.js reads
  // entries in that shape, so this must not be a plain array.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

/** GA4 event (e.g. reservation_submitted, add_to_cart, whatsapp_click). */
export function track(event: string, params?: Record<string, unknown>): void {
  if (!analyticsEnabled) return;
  push("event", event, params);
}

/** Direct Google Ads conversion ping (used when a conversion label is set). */
export function trackAdsConversion(label: string, value?: number): void {
  if (!ADS_ID || !label) return;
  push("event", "conversion", {
    send_to: `${ADS_ID}/${label}`,
    ...(value !== undefined && { value, currency: "USD" }),
  });
}
