/**
 * Central place for business details. Edit these once your real info is ready —
 * every page, email, and footer reads from here.
 */
export const site = {
  name: "Bengal Kittens",
  tagline: "Loving kittens, raised at home",
  currency: "USD",
  phone: "(555) 123-4567",
  email: "hello@bengalkittens.example.com",
  address: "123 Willow Lane, Portland, OR 97201",
  hours: "Mon–Sat, 9am–6pm",
  instagram: "https://instagram.com/bengalkittens",
  facebook: "https://facebook.com/bengalkittens",
};

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: site.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
