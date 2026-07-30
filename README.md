# Bengal Kittens 🐾

A calm, welcoming website for selling family-raised kittens, built with
Next.js 16, Supabase, and Resend.

## What's inside

- **Public site** — home, available kittens (with breed filter), kitten detail
  pages, about, FAQ, health guarantee & policies, contact
- **Reservations** — visitors add kittens to a basket and submit a reservation
  (no online payment); it's saved to Supabase and emailed to you
- **Contact form** — saved to Supabase and emailed to you
- **Admin dashboard** (`/admin`) — email/password login for the owner only:
  add/edit/delete kittens with photo uploads, manage orders, read messages

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. With no keys configured the site runs in
**preview mode** with 8 sample kittens; the dashboard at `/admin` accepts any
email with the password `preview`.

## Go live

Follow [SETUP.md](SETUP.md) — create a Supabase project, run
`supabase/schema.sql`, create a Resend key, and paste five values into
`.env.local`. Everything switches from sample data to the real database
automatically.
