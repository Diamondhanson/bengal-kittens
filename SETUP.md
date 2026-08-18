# Going live — plug in your keys

The site already runs fully in **preview mode** (sample kittens, working pages,
preview dashboard login). To make it real, you create two free accounts, copy
five values into `.env.local`, and everything switches over automatically —
no code changes.

## 1. Supabase (database, admin login, photo storage)

1. Go to <https://supabase.com/dashboard> → **New project**. Pick any name
   (e.g. `bengal-kittens`), set a strong database password, choose a region
   near you.
2. When the project is ready, open **SQL Editor → New query**, paste the whole
   contents of [`supabase/schema.sql`](supabase/schema.sql), and press **Run**.
   This creates all tables, security policies, the photo storage bucket, and
   the 8 sample kittens.
3. Create your admin login: **Authentication → Users → Add user → Create new
   user**. Use the email you'll log in with (must match `ADMIN_EMAIL` in
   `.env.local`) and a strong password. Check **Auto Confirm User**.
4. Recommended: **Authentication → Sign In / Up → disable "Allow new users to
   sign up"** — only you should ever have an account. (The app also refuses
   any login that doesn't match `ADMIN_EMAIL`, so this is belt-and-suspenders.)
5. Copy your keys from **Project Settings → API keys**:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` / `publishable` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` / `secret` key → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Resend (order + contact emails)

1. Sign up at <https://resend.com> and create an API key at
   <https://resend.com/api-keys> → `RESEND_API_KEY`.
2. That's it for testing: with the default sandbox sender
   (`onboarding@resend.dev`), Resend delivers **only to your own account
   email** — so sign up with the same address as `NOTIFICATION_EMAIL` and
   order/contact notifications will land in your inbox right away.
3. Later (recommended before launch): verify your own domain under
   **Domains** in Resend, then change `RESEND_FROM_EMAIL` to something like
   `Bengal Kittens <hello@yourdomain.com>`. That removes the sandbox limits and
   lets customers receive their confirmation emails too.

## 3. Fill in `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=Bengal Kittens <onboarding@resend.dev>
NOTIFICATION_EMAIL=bengalkittenhaven@gmail.com
ADMIN_EMAIL=bengalkittenhaven@gmail.com
```

Restart the dev server (`npm run dev`). Done — the catalog now reads from
Supabase, orders and messages are saved and emailed, the dashboard uses your
real Supabase login, and photo uploads go to Supabase Storage.

## How the two modes work

| | Preview mode (no keys) | Live mode (keys filled in) |
|---|---|---|
| Catalog | Built-in sample kittens | `kittens` table in Supabase |
| Orders / contact forms | Accepted, shown as success, logged to the server console only | Saved to Supabase **and** emailed to `NOTIFICATION_EMAIL` |
| Dashboard login | Any email + `ADMIN_PREVIEW_PASSWORD` (default `preview`) | Supabase email/password, restricted to `ADMIN_EMAIL` |
| Adding/editing kittens | Disabled (friendly error) | Full CRUD + photo upload |

## Before you launch (checklist)

- [ ] Replace the placeholder phone/address/socials in [`lib/site.ts`](lib/site.ts)
- [ ] Delete the 8 sample kittens in **Dashboard → Kittens** and add your real ones
- [ ] Verify your domain in Resend and update `RESEND_FROM_EMAIL`
- [ ] Deploy (e.g. Vercel) and add the same env vars in the hosting dashboard
