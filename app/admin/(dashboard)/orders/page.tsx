import { setOrderStatus } from "@/app/actions/admin";
import { getOrders } from "@/lib/data";
import { formatPrice } from "@/lib/site";
import { formatDateTime } from "@/lib/utils";
import type { OrderStatus } from "@/lib/types";

const statusStyles: Record<OrderStatus, string> = {
  new: "bg-clay-100 text-clay-700",
  contacted: "bg-moss-100 text-moss-700",
  completed: "bg-moss-200 text-moss-700",
  cancelled: "bg-cream-200 text-ink-400",
};

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-900">Orders</h1>
      <p className="mt-2 text-sm text-ink-500">
        Reservation requests from the website. Each one was also emailed to you.
      </p>

      <div className="mt-8 space-y-6">
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-2xl border border-cream-300 bg-white p-6"
          >
            <header className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-xl font-semibold text-ink-900">
                    {order.customer_name}
                  </h2>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-500">
                  <a href={`mailto:${order.email}`} className="font-semibold text-clay-600">
                    {order.email}
                  </a>
                  {order.phone && <> · {order.phone}</>}
                  {(order.city || order.state) && (
                    <> · {[order.city, order.state].filter(Boolean).join(", ")}</>
                  )}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-xl font-semibold text-clay-600">
                  {formatPrice(order.total)}
                </p>
                <p className="text-xs text-ink-400">{formatDateTime(order.created_at)}</p>
              </div>
            </header>

            <ul className="mt-4 flex flex-wrap gap-2">
              {(order.items ?? []).map((item) => (
                <li
                  key={item.id}
                  className="rounded-full bg-cream-100 px-4 py-1.5 text-sm font-semibold text-ink-700"
                >
                  {item.kitten_name} ({item.kitten_breed}) — {formatPrice(item.price)}
                </li>
              ))}
            </ul>

            {order.message && (
              <p className="mt-4 rounded-xl bg-cream-100 p-4 text-sm leading-relaxed text-ink-700">
                {order.message}
              </p>
            )}

            <form action={setOrderStatus} className="mt-4 flex items-center gap-2">
              <input type="hidden" name="id" value={order.id} />
              <label htmlFor={`status-${order.id}`} className="text-sm font-bold text-ink-500">
                Status:
              </label>
              <select
                id={`status-${order.id}`}
                name="status"
                defaultValue={order.status}
                className="rounded-lg border border-cream-300 bg-white px-3 py-1.5 text-sm"
              >
                <option value="new">new</option>
                <option value="contacted">contacted</option>
                <option value="completed">completed</option>
                <option value="cancelled">cancelled</option>
              </select>
              <button
                type="submit"
                className="rounded-lg bg-cream-100 px-3 py-1.5 text-sm font-bold text-ink-500 hover:bg-cream-200"
              >
                Update
              </button>
            </form>
          </article>
        ))}
        {orders.length === 0 && (
          <div className="rounded-2xl border border-cream-300 bg-white p-12 text-center text-ink-400">
            No orders yet — they'll appear here the moment a family reserves a kitten.
          </div>
        )}
      </div>
    </div>
  );
}
