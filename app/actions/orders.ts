"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createOrder, getKittensByIds } from "@/lib/data";
import { sendOrderNotification } from "@/lib/email";

export interface OrderFormState {
  error?: string;
}

export async function submitOrder(
  _prev: OrderFormState,
  formData: FormData
): Promise<OrderFormState> {
  const customer_name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  let kittenIds: string[] = [];
  try {
    const parsed = JSON.parse(String(formData.get("kitten_ids") ?? "[]"));
    if (Array.isArray(parsed)) kittenIds = parsed.map(String);
  } catch {
    // fall through to the empty-cart error below
  }

  if (!customer_name || !email) {
    return { error: "Please fill in your name and email address." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "That email address doesn't look right." };
  }
  if (kittenIds.length === 0) {
    return { error: "Your basket is empty. Pick a kitten first!" };
  }

  // Look the kittens up server-side so prices/names can't be tampered with.
  const kittens = await getKittensByIds(kittenIds);
  if (kittens.length !== kittenIds.length) {
    return {
      error:
        "One of the kittens in your basket is no longer listed. Please review your basket and try again.",
    };
  }
  const unavailable = kittens.filter((k) => k.status !== "available");
  if (unavailable.length > 0) {
    return {
      error: `${unavailable
        .map((k) => k.name)
        .join(", ")} ${unavailable.length === 1 ? "has" : "have"} just been reserved by another family. Please remove ${unavailable.length === 1 ? "it" : "them"} from your basket.`,
    };
  }

  const order = {
    customer_name,
    email,
    phone,
    city,
    state,
    message,
    items: kittens.map((k) => ({
      kitten_id: k.id,
      kitten_name: k.name,
      kitten_breed: k.breed,
      price: k.price,
    })),
  };

  try {
    await createOrder(order);
    await sendOrderNotification(order);
  } catch (err) {
    console.error("Order submission failed:", err);
    return {
      error:
        "Something went wrong while sending your reservation. Please try again, or contact us directly.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/reserve/thank-you");
}
