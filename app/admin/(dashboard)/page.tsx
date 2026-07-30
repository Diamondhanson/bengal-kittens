import Link from "next/link";
import { getContacts, getKittens, getOrders } from "@/lib/data";
import { formatPrice } from "@/lib/site";
import { formatDateTime } from "@/lib/utils";

export default async function AdminOverviewPage() {
  const [kittens, orders, contacts] = await Promise.all([
    getKittens(),
    getOrders(),
    getContacts(),
  ]);

  const available = kittens.filter((k) => k.status === "available").length;
  const newOrders = orders.filter((o) => o.status === "new").length;
  const newMessages = contacts.filter((c) => c.status === "new").length;

  const stats = [
    { label: "Kittens listed", value: kittens.length, sub: `${available} available`, href: "/admin/kittens" },
    { label: "Orders", value: orders.length, sub: `${newOrders} new`, href: "/admin/orders" },
    { label: "Messages", value: contacts.length, sub: `${newMessages} unread`, href: "/admin/contacts" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold text-ink-900">
          Overview
        </h1>
        <Link
          href="/admin/kittens/new"
          className="rounded-xl bg-clay-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-clay-600"
        >
          + Add kitten
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-cream-300 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-ink-400">
              {stat.label}
            </p>
            <p className="mt-2 font-display text-4xl font-semibold text-ink-900">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-semibold text-moss-600">{stat.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-cream-300 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-ink-900">
              Latest orders
            </h2>
            <Link href="/admin/orders" className="text-sm font-bold text-clay-600">
              View all →
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-cream-200">
            {orders.slice(0, 5).map((order) => (
              <li key={order.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="font-semibold text-ink-900">{order.customer_name}</p>
                  <p className="truncate text-sm text-ink-400">
                    {(order.items ?? []).map((i) => i.kitten_name).join(", ") || "—"}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-clay-600">{formatPrice(order.total)}</p>
                  <p className="text-xs text-ink-400">{formatDateTime(order.created_at)}</p>
                </div>
              </li>
            ))}
            {orders.length === 0 && (
              <li className="py-6 text-center text-sm text-ink-400">No orders yet.</li>
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-cream-300 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-ink-900">
              Latest messages
            </h2>
            <Link href="/admin/contacts" className="text-sm font-bold text-clay-600">
              View all →
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-cream-200">
            {contacts.slice(0, 5).map((contact) => (
              <li key={contact.id} className="py-3">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-ink-900">{contact.name}</p>
                  <p className="text-xs text-ink-400">{formatDateTime(contact.created_at)}</p>
                </div>
                <p className="mt-0.5 truncate text-sm text-ink-400">
                  {contact.subject || contact.message}
                </p>
              </li>
            ))}
            {contacts.length === 0 && (
              <li className="py-6 text-center text-sm text-ink-400">No messages yet.</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
