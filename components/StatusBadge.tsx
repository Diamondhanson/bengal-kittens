import type { KittenStatus } from "@/lib/types";

const styles: Record<KittenStatus, string> = {
  available: "bg-moss-100 text-moss-700",
  reserved: "bg-clay-100 text-clay-700",
  sold: "bg-cream-200 text-ink-400",
};

const labels: Record<KittenStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Adopted",
};

export function StatusBadge({ status }: { status: KittenStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
