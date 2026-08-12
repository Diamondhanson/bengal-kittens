import type { ContactMessage, Order, Review } from "./types";

/**
 * Placeholder orders/contacts shown in the dashboard while Supabase is not
 * configured, so you can preview the admin screens. Real data replaces these
 * automatically once your keys are in.
 */
export const sampleOrders: Order[] = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    customer_name: "Sarah Mitchell",
    email: "sarah.mitchell@example.com",
    phone: "(555) 867-5309",
    city: "Seattle",
    state: "WA",
    message:
      "We fell in love with Luna! We have a quiet home with two kids (8 and 11) and are ready to welcome her whenever she's old enough.",
    status: "new",
    total: 2200,
    created_at: "2026-07-26T15:24:00Z",
    items: [
      {
        id: "11000000-0000-4000-8000-000000000001",
        order_id: "10000000-0000-4000-8000-000000000001",
        kitten_id: "00000000-0000-4000-8000-000000000001",
        kitten_name: "Luna",
        kitten_breed: "Bengal",
        price: 2200,
      },
    ],
  },
  {
    id: "10000000-0000-4000-8000-000000000002",
    customer_name: "James Okafor",
    email: "j.okafor@example.com",
    phone: "(555) 234-1188",
    city: "Portland",
    state: "OR",
    message: "Interested in Simba and Cleo as a bonded pair. Do you offer a discount for adopting two?",
    status: "contacted",
    total: 4900,
    created_at: "2026-07-24T09:02:00Z",
    items: [
      {
        id: "11000000-0000-4000-8000-000000000002",
        order_id: "10000000-0000-4000-8000-000000000002",
        kitten_id: "00000000-0000-4000-8000-000000000002",
        kitten_name: "Simba",
        kitten_breed: "Bengal",
        price: 2400,
      },
      {
        id: "11000000-0000-4000-8000-000000000003",
        order_id: "10000000-0000-4000-8000-000000000002",
        kitten_id: "00000000-0000-4000-8000-000000000003",
        kitten_name: "Cleo",
        kitten_breed: "Bengal",
        price: 2500,
      },
    ],
  },
];

export const sampleContacts: ContactMessage[] = [
  {
    id: "20000000-0000-4000-8000-000000000001",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    phone: "(555) 990-2211",
    subject: "Upcoming litters",
    message:
      "Hi! Are you expecting any snow Bengal litters this fall? I'd love to get on the waitlist.",
    status: "new",
    created_at: "2026-07-27T11:40:00Z",
  },
  {
    id: "20000000-0000-4000-8000-000000000002",
    name: "Marcus Webb",
    email: "marcus.webb@example.com",
    phone: "",
    subject: "Visit before reserving?",
    message:
      "Is it possible to visit the kittens before placing a reservation? We're about an hour away.",
    status: "replied",
    created_at: "2026-07-25T18:05:00Z",
  },
];

export const sampleReviews: Review[] = [
  {
    id: "30000000-0000-4000-8000-000000000001",
    name: "The Ramirez family",
    location: "Denver, CO",
    rating: 5,
    message:
      "Our Bengal boy arrived confident, healthy, and impossibly sweet. You can tell these kittens grow up in a real home full of love.",
    approved: true,
    featured: true,
    created_at: "2026-07-12T15:00:00Z",
  },
  {
    id: "30000000-0000-4000-8000-000000000002",
    name: "Priya S.",
    location: "Austin, TX",
    rating: 5,
    message:
      "The weekly photo updates while we waited were the highlight of our summer. Our kitten came home litter trained and purring.",
    approved: true,
    featured: false,
    created_at: "2026-07-20T10:30:00Z",
  },
  {
    id: "30000000-0000-4000-8000-000000000003",
    name: "Mark & Ellie",
    location: "Chicago, IL",
    rating: 4,
    message:
      "Great communication from the first message to pickup day. Our vet was impressed with the health records that came with her.",
    approved: true,
    featured: false,
    created_at: "2026-07-25T18:45:00Z",
  },
];
