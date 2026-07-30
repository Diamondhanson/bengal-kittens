import { KittenForm } from "@/components/admin/KittenForm";

export default function NewKittenPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-900">
        Add a kitten
      </h1>
      <p className="mt-2 text-sm text-ink-500">
        Fill in everything a family would want to know before reserving.
      </p>
      <div className="mt-8">
        <KittenForm />
      </div>
    </div>
  );
}
