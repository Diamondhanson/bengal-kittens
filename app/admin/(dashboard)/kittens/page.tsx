import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { removeKitten, setKittenStatus } from "@/app/actions/admin";
import { getKittens } from "@/lib/data";
import { formatPrice } from "@/lib/site";
import { formatAge } from "@/lib/utils";

export default async function AdminKittensPage() {
  const kittens = await getKittens();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold text-ink-900">
          Kittens
        </h1>
        <Link
          href="/admin/kittens/new"
          className="rounded-xl bg-clay-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-clay-600"
        >
          + Add kitten
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-cream-300 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-cream-200 text-xs font-bold uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-5 py-4">Kitten</th>
              <th className="px-5 py-4">Breed</th>
              <th className="px-5 py-4">Age</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-200">
            {kittens.map((kitten) => (
              <tr key={kitten.id}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-200">
                      {kitten.images[0] && (
                        <Image
                          src={kitten.images[0]}
                          alt={kitten.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-ink-900">{kitten.name}</p>
                      <p className="text-xs text-ink-400">
                        {kitten.gender === "female" ? "Female" : "Male"} · {kitten.color}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-ink-500">{kitten.breed}</td>
                <td className="px-5 py-3 text-ink-500">{formatAge(kitten.date_of_birth)}</td>
                <td className="px-5 py-3 font-bold text-clay-600">{formatPrice(kitten.price)}</td>
                <td className="px-5 py-3">
                  <form action={setKittenStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={kitten.id} />
                    <StatusBadge status={kitten.status} />
                    <select
                      name="status"
                      defaultValue={kitten.status}
                      className="rounded-lg border border-cream-300 bg-white px-2 py-1 text-xs"
                    >
                      <option value="available">available</option>
                      <option value="reserved">reserved</option>
                      <option value="sold">sold</option>
                    </select>
                    <button
                      type="submit"
                      className="rounded-lg bg-cream-100 px-2 py-1 text-xs font-bold text-ink-500 hover:bg-cream-200"
                    >
                      Set
                    </button>
                  </form>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/kittens/${kitten.slug}`}
                      className="rounded-lg px-3 py-1.5 text-xs font-bold text-ink-400 hover:bg-cream-100"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/kittens/${kitten.id}/edit`}
                      className="rounded-lg bg-moss-100 px-3 py-1.5 text-xs font-bold text-moss-700 hover:bg-moss-200"
                    >
                      Edit
                    </Link>
                    <form action={removeKitten}>
                      <input type="hidden" name="id" value={kitten.id} />
                      <button
                        type="submit"
                        className="rounded-lg bg-clay-100 px-3 py-1.5 text-xs font-bold text-clay-700 hover:bg-clay-200"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {kittens.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-ink-400">
                  No kittens yet — add your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
