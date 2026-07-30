import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { logout } from "@/app/actions/auth";
import { site } from "@/lib/site";

const nav = [
  { href: "/admin", label: "Overview", icon: "📊" },
  { href: "/admin/kittens", label: "Kittens", icon: "🐱" },
  { href: "/admin/orders", label: "Orders", icon: "🧾" },
  { href: "/admin/contacts", label: "Messages", icon: "✉️" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The proxy already gates /admin, but layouts and actions verify again.
  const session = await getAdminSession();
  if (!session.isAdmin) redirect("/admin/login");

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-cream-100">
      <aside className="lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-cream-300 bg-white">
        <div className="flex items-center justify-between gap-3 p-5 lg:block">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-full shadow-sm ring-1 ring-cream-300"
            />
            <span className="font-display text-lg font-semibold text-ink-900">
              {site.name}
            </span>
          </Link>
          <p className="hidden lg:block mt-1 text-xs font-bold uppercase tracking-wide text-ink-300">
            Dashboard
          </p>
        </div>
        <nav className="flex lg:flex-col gap-1 px-3 pb-4 lg:pb-0 overflow-x-auto">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold text-ink-500 transition-colors hover:bg-cream-100 hover:text-ink-900"
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block px-3 mt-6 space-y-1 pb-6">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-ink-400 hover:bg-cream-100"
          >
            🌐 View website
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-ink-400 hover:bg-cream-100"
            >
              👋 Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        {session.mode === "preview" && (
          <div className="bg-clay-100 px-6 py-3 text-sm font-semibold text-clay-700">
            Preview mode: Supabase isn't connected yet, so you're seeing
            sample data and saving is disabled. Follow SETUP.md to plug in your
            keys.
          </div>
        )}
        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
