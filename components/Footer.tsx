import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-cream-300 bg-cream-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink-900">
            <Image
              src="/logo.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-full shadow-sm ring-1 ring-cream-300"
            />
            {site.name}
          </p>
          <p className="mt-3 text-sm text-ink-500 leading-relaxed">
            Family-raised kittens, socialized from day one and ready to bring
            warmth to your home.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-ink-400">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="text-ink-500 hover:text-clay-600" href="/kittens">Available Kittens</Link></li>
            <li><Link className="text-ink-500 hover:text-clay-600" href="/about">About Us</Link></li>
            <li><Link className="text-ink-500 hover:text-clay-600" href="/faq">FAQ</Link></li>
            <li><Link className="text-ink-500 hover:text-clay-600" href="/health-guarantee">Health Guarantee</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-ink-400">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm text-ink-500">
            <li>
              <a className="hover:text-clay-600" href={site.whatsappLink} target="_blank" rel="noreferrer">
                WhatsApp: {site.whatsapp}
              </a>
            </li>
            <li>
              <a className="hover:text-clay-600" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>{site.hours}</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-ink-400">
            Follow along
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="text-ink-500 hover:text-clay-600" href={site.facebook} target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a className="text-ink-500 hover:text-clay-600" href={site.whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li><a className="text-ink-500 hover:text-clay-600" href={site.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream-300 py-5 text-center text-xs text-ink-400">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
