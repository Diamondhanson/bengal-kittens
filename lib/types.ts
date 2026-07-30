export type KittenStatus = "available" | "reserved" | "sold";
export type OrderStatus = "new" | "contacted" | "completed" | "cancelled";
export type ContactStatus = "new" | "replied";

export interface Kitten {
  id: string;
  slug: string;
  name: string;
  breed: string;
  gender: "male" | "female";
  color: string;
  date_of_birth: string; // ISO date
  price: number;
  description: string;
  temperament: string;
  vaccinated: boolean;
  litter_trained: boolean;
  health_notes: string;
  status: KittenStatus;
  featured: boolean;
  images: string[];
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  kitten_id: string | null;
  kitten_name: string;
  kitten_breed: string;
  price: number;
}

export interface Order {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  message: string;
  status: OrderStatus;
  total: number;
  created_at: string;
  items?: OrderItem[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: ContactStatus;
  created_at: string;
}

/** Fields the dashboard submits when creating/editing a kitten. */
export interface KittenInput {
  name: string;
  breed: string;
  gender: "male" | "female";
  color: string;
  date_of_birth: string;
  price: number;
  description: string;
  temperament: string;
  vaccinated: boolean;
  litter_trained: boolean;
  health_notes: string;
  status: KittenStatus;
  featured: boolean;
  images: string[];
}
