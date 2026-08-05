import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Bengal Kittens for Sale | Family-Raised & Vet-Checked | Bengal Kitten Haven",
    template: `%s | ${site.name}`,
  },
  description:
    "Family-raised Bengal kittens for sale from a small in-home cattery. Every kitten is vet-checked, vaccinated, socialized with children and pets, and comes with a written health guarantee.",
  applicationName: site.name,
  category: "Pets",
  alternates: { canonical: "/" },
  keywords: [
    "Bengal kittens for sale",
    "Bengal kitten haven",
    "Bengal cattery",
    "Bengal kittens for adoption",
    "rosetted Bengal kitten",
    "snow Bengal kitten",
    "silver Bengal kitten",
    "family-raised kittens",
    "kittens for sale",
    "kittens for adoption",
    "vet-checked kittens",
    "TICA Bengal breeder",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `Bengal Kittens for Sale | ${site.tagline}`,
    description:
      "Family-raised Bengal kittens for sale. Vet-checked, vaccinated, socialized with love, and backed by a written health guarantee.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Bengal Kittens for Sale | ${site.tagline}`,
    description:
      "Family-raised Bengal kittens for sale. Vet-checked, vaccinated, socialized with love, and backed by a written health guarantee.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
