/**
 * Central place for business details. Edit these once your real info is ready —
 * every page, email, and footer reads from here.
 */
export const site = {
  name: "Bengal Kittens",
  tagline: "Loving kittens, raised at home",
  currency: "USD",
  phone: "(555) 123-4567",
  whatsapp: "+1 (332) 318-4580",
  whatsappLink: "https://wa.me/13323184580",
  email: "bengalkittensavailable11@gmail.com",
  address: "123 Willow Lane, Portland, OR 97201",
  hours: "Mon–Sat, 9am–6pm",
  instagram: "https://instagram.com/bengalkittens",
  facebook: "https://www.facebook.com/share/g/1EBSyQS7q4/?mibextid=wwXIfr",
};

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: site.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
