"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/kittens", label: "Available Kittens" },
  { href: "/about", label: "About Us" },
  { href: "/health-guarantee", label: "Health Guarantee" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { items } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream-50/90 backdrop-blur border-b border-cream-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <Image
              src="/logo.png"
              alt={`${site.name} logo`}
              width={40}
              height={40}
              priority
              className="h-10 w-10 rounded-full shadow-sm ring-1 ring-cream-300"
            />
            <span className="whitespace-nowrap font-display text-lg sm:text-xl font-semibold tracking-tight text-ink-900">
              {site.name}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-semibold transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:rounded-full after:bg-clay-500 after:transition-all after:duration-300 ${
                  pathname === link.href
                    ? "text-clay-600 after:w-full"
                    : "text-ink-500 hover:text-ink-900 after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative rounded-full bg-clay-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-clay-600 active:scale-95"
              onClick={() => setOpen(false)}
            >
              Basket
              {items.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-moss-600 text-[11px] font-bold text-white">
                  {items.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              className="lg:hidden rounded-md border border-cream-300 px-3 py-2 text-sm font-semibold text-ink-700"
              onClick={() => setOpen((v) => !v)}
            >
              Menu
            </button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden flex flex-col gap-1 pb-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                  pathname === link.href
                    ? "bg-clay-100 text-clay-700"
                    : "text-ink-500 hover:bg-cream-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
