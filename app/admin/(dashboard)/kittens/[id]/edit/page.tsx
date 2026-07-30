import { notFound } from "next/navigation";
import { KittenForm } from "@/components/admin/KittenForm";
import { getKittenById } from "@/lib/data";

export default async function EditKittenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kitten = await getKittenById(id);
  if (!kitten) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-900">
        Edit {kitten.name}
      </h1>
      <div className="mt-8">
        <KittenForm kitten={kitten} />
      </div>
    </div>
  );
}
