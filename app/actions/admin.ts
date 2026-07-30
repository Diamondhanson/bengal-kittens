"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  createKitten,
  deleteKitten,
  updateContactStatus,
  updateKitten,
  updateOrderStatus,
} from "@/lib/data";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { ContactStatus, KittenInput, OrderStatus } from "@/lib/types";

export interface KittenFormState {
  error?: string;
}

const IMAGE_BUCKET = "kitten-images";

async function uploadPhotos(files: File[]): Promise<string[]> {
  const supabase = createSupabaseAdminClient();
  const urls: string[] = [];
  for (const file of files) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from(IMAGE_BUCKET)
      .upload(path, file, { contentType: file.type || "image/jpeg" });
    if (error) throw new Error(`Photo upload failed: ${error.message}`);
    const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  return urls;
}

function parseKittenForm(formData: FormData): Omit<KittenInput, "images"> {
  return {
    name: String(formData.get("name") ?? "").trim(),
    breed: String(formData.get("breed") ?? "").trim(),
    gender: formData.get("gender") === "female" ? "female" : "male",
    color: String(formData.get("color") ?? "").trim(),
    date_of_birth: String(formData.get("date_of_birth") ?? "").trim(),
    price: Number(formData.get("price") ?? 0),
    description: String(formData.get("description") ?? "").trim(),
    temperament: String(formData.get("temperament") ?? "").trim(),
    vaccinated: formData.get("vaccinated") === "on",
    litter_trained: formData.get("litter_trained") === "on",
    health_notes: String(formData.get("health_notes") ?? "").trim(),
    status: (formData.get("status") as KittenInput["status"]) || "available",
    featured: formData.get("featured") === "on",
  };
}

export async function saveKitten(
  _prev: KittenFormState,
  formData: FormData
): Promise<KittenFormState> {
  await requireAdmin();

  if (!isSupabaseConfigured()) {
    return {
      error:
        "Preview mode: connect Supabase (see SETUP.md) to add or edit kittens. The catalog currently shows built-in sample data.",
    };
  }

  const id = String(formData.get("id") ?? "");
  const fields = parseKittenForm(formData);

  if (!fields.name || !fields.breed || !fields.date_of_birth) {
    return { error: "Name, breed, and date of birth are required." };
  }
  if (!Number.isFinite(fields.price) || fields.price <= 0) {
    return { error: "Please enter a valid price." };
  }

  // Existing images kept from the edit form + any pasted URLs + new uploads.
  const imageUrls = formData
    .getAll("image_urls")
    .map((value) => String(value).trim())
    .filter(Boolean);
  const photos = formData
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0);

  try {
    const uploaded = photos.length > 0 ? await uploadPhotos(photos) : [];
    const images = [...imageUrls, ...uploaded];
    if (images.length === 0) {
      return { error: "Add at least one photo (upload or image URL)." };
    }
    if (id) {
      await updateKitten(id, { ...fields, images });
    } else {
      await createKitten({ ...fields, images });
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save." };
  }

  revalidatePath("/", "layout");
  redirect("/admin/kittens");
}

export async function removeKitten(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!isSupabaseConfigured() || !id) return;
  await deleteKitten(id);
  revalidatePath("/", "layout");
}

export async function setKittenStatus(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as KittenInput["status"];
  if (!isSupabaseConfigured() || !id) return;
  if (!["available", "reserved", "sold"].includes(status)) return;
  await updateKitten(id, { status });
  revalidatePath("/", "layout");
}

export async function setOrderStatus(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as OrderStatus;
  if (!isSupabaseConfigured() || !id) return;
  if (!["new", "contacted", "completed", "cancelled"].includes(status)) return;
  await updateOrderStatus(id, status);
  revalidatePath("/admin/orders");
}

export async function setContactStatus(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as ContactStatus;
  if (!isSupabaseConfigured() || !id) return;
  if (!["new", "replied"].includes(status)) return;
  await updateContactStatus(id, status);
  revalidatePath("/admin/contacts");
}
