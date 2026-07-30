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
    default: `${site.name} | Loving kittens, raised at home`,
    template: `%s | ${site.name}`,
  },
  description:
    "Family-raised Bengal, Siamese, British Shorthair, and Maine Coon kittens looking for their forever homes. Healthy, vaccinated, vet-checked, and socialized with love.",
  keywords: [
    "Bengal kittens for sale",
    "kittens for adoption",
    "family-raised kittens",
    "Bengal cattery",
    "Siamese kittens",
    "Maine Coon kittens",
    "British Shorthair kittens",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description:
      "Family-raised kittens looking for their forever homes. Healthy, vaccinated, vet-checked, and socialized with love.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description:
      "Family-raised kittens looking for their forever homes. Healthy, vaccinated, vet-checked, and socialized with love.",
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
