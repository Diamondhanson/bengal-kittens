import "server-only";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "./supabase/admin";
import { isSupabaseConfigured } from "./supabase/config";
import { sampleKittens } from "./sample-kittens";
import { sampleContacts, sampleOrders } from "./sample-admin";
import type {
  ContactMessage,
  ContactStatus,
  Kitten,
  KittenInput,
  Order,
  OrderStatus,
} from "./types";

// ---------------------------------------------------------------------------
// Kittens (public reads use a cookie-less anon client so pages stay cacheable;
// RLS allows read-only access)
// ---------------------------------------------------------------------------

function createAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

export async function getKittens(breed?: string): Promise<Kitten[]> {
  if (!isSupabaseConfigured()) {
    const all = sampleKittens;
    return breed ? all.filter((k) => k.breed === breed) : all;
  }
  const supabase = createAnonClient();
  let query = supabase
    .from("kittens")
    .select("*")
    .order("created_at", { ascending: false });
  if (breed) query = query.eq("breed", breed);
  const { data, error } = await query;
  if (error) throw new Error(`Failed to load kittens: ${error.message}`);
  return data as Kitten[];
}

export async function getFeaturedKittens(): Promise<Kitten[]> {
  const kittens = await getKittens();
  const featured = kittens.filter(
    (k) => k.featured && k.status === "available"
  );
  return (featured.length > 0 ? featured : kittens).slice(0, 3);
}

export async function getBreeds(): Promise<string[]> {
  const kittens = await getKittens();
  return [...new Set(kittens.map((k) => k.breed))].sort();
}

export async function getKittenBySlug(slug: string): Promise<Kitten | null> {
  if (!isSupabaseConfigured()) {
    return sampleKittens.find((k) => k.slug === slug) ?? null;
  }
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("kittens")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`Failed to load kitten: ${error.message}`);
  return data as Kitten | null;
}

export async function getKittenById(id: string): Promise<Kitten | null> {
  if (!isSupabaseConfigured()) {
    return sampleKittens.find((k) => k.id === id) ?? null;
  }
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("kittens")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Failed to load kitten: ${error.message}`);
  return data as Kitten | null;
}

export async function getKittensByIds(ids: string[]): Promise<Kitten[]> {
  if (ids.length === 0) return [];
  if (!isSupabaseConfigured()) {
    return sampleKittens.filter((k) => ids.includes(k.id));
  }
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("kittens")
    .select("*")
    .in("id", ids);
  if (error) throw new Error(`Failed to load kittens: ${error.message}`);
  return data as Kitten[];
}

// ---------------------------------------------------------------------------
// Kittens (admin writes; callers must verify the admin session first)
// ---------------------------------------------------------------------------

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createKitten(input: KittenInput): Promise<Kitten> {
  const supabase = createSupabaseAdminClient();
  const slug = `${slugify(input.name)}-${slugify(input.breed)}-${Math.random()
    .toString(36)
    .slice(2, 6)}`;
  const { data, error } = await supabase
    .from("kittens")
    .insert({ ...input, slug })
    .select()
    .single();
  if (error) throw new Error(`Failed to create kitten: ${error.message}`);
  return data as Kitten;
}

export async function updateKitten(
  id: string,
  input: Partial<KittenInput>
): Promise<Kitten> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("kittens")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update kitten: ${error.message}`);
  return data as Kitten;
}

export async function deleteKitten(id: string): Promise<void> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("kittens").delete().eq("id", id);
  if (error) throw new Error(`Failed to delete kitten: ${error.message}`);
}

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------

export interface NewOrder {
  customer_name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  message: string;
  items: { kitten_id: string; kitten_name: string; kitten_breed: string; price: number }[];
}

/** Returns the created order id, or null in preview mode (nothing persisted). */
export async function createOrder(order: NewOrder): Promise<string | null> {
  const total = order.items.reduce((sum, item) => sum + item.price, 0);
  if (!isSupabaseConfigured()) {
    console.log("[preview] Order received (not persisted):", order);
    return null;
  }
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .insert({
      customer_name: order.customer_name,
      email: order.email,
      phone: order.phone,
      city: order.city,
      state: order.state,
      message: order.message,
      total,
    })
    .select("id")
    .single();
  if (error) throw new Error(`Failed to save order: ${error.message}`);

  const { error: itemsError } = await supabase.from("order_items").insert(
    order.items.map((item) => ({ order_id: data.id, ...item }))
  );
  if (itemsError)
    throw new Error(`Failed to save order items: ${itemsError.message}`);

  // Mark the requested kittens as reserved so they can't be double-booked.
  await supabase
    .from("kittens")
    .update({ status: "reserved" })
    .in(
      "id",
      order.items.map((item) => item.kitten_id)
    )
    .eq("status", "available");

  return data.id as string;
}

export async function getOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured()) return sampleOrders;
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Failed to load orders: ${error.message}`);
  return (data ?? []).map((row) => {
    const { order_items, ...order } = row as Order & {
      order_items: Order["items"];
    };
    return { ...order, items: order_items ?? [] };
  });
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<void> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(`Failed to update order: ${error.message}`);
}

// ---------------------------------------------------------------------------
// Contact messages
// ---------------------------------------------------------------------------

export interface NewContact {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function createContact(contact: NewContact): Promise<void> {
  if (!isSupabaseConfigured()) {
    console.log("[preview] Contact message received (not persisted):", contact);
    return;
  }
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("contacts").insert(contact);
  if (error) throw new Error(`Failed to save message: ${error.message}`);
}

export async function getContacts(): Promise<ContactMessage[]> {
  if (!isSupabaseConfigured()) return sampleContacts;
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Failed to load messages: ${error.message}`);
  return data as ContactMessage[];
}

export async function updateContactStatus(
  id: string,
  status: ContactStatus
): Promise<void> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("contacts")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(`Failed to update message: ${error.message}`);
}
