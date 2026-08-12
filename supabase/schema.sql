-- ============================================================================
-- Bengal Kittens, full database setup
-- Run this ONCE in your Supabase project: Dashboard → SQL Editor → New query,
-- paste everything, press "Run". It creates all tables, security policies,
-- the photo storage bucket, and the 8 sample kittens.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.kittens (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  breed         text not null,
  gender        text not null default 'male' check (gender in ('male', 'female')),
  color         text not null default '',
  date_of_birth date not null,
  price         numeric not null check (price > 0),
  description   text not null default '',
  temperament   text not null default '',
  vaccinated    boolean not null default true,
  litter_trained boolean not null default true,
  health_notes  text not null default '',
  status        text not null default 'available' check (status in ('available', 'reserved', 'sold')),
  featured      boolean not null default false,
  images        text[] not null default '{}',
  created_at    timestamptz not null default now()
);

create table if not exists public.orders (
  id            uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email         text not null,
  phone         text not null default '',
  city          text not null default '',
  state         text not null default '',
  message       text not null default '',
  status        text not null default 'new' check (status in ('new', 'contacted', 'completed', 'cancelled')),
  total         numeric not null default 0,
  created_at    timestamptz not null default now()
);

create table if not exists public.order_items (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references public.orders (id) on delete cascade,
  kitten_id    uuid references public.kittens (id) on delete set null,
  kitten_name  text not null,
  kitten_breed text not null default '',
  price        numeric not null default 0
);

create table if not exists public.contacts (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text not null default '',
  subject    text not null default '',
  message    text not null,
  status     text not null default 'new' check (status in ('new', 'replied')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- The website reads kittens with the public (anon) key. Orders, order items,
-- and contacts are written/read only by the server using the service-role key
-- (which bypasses RLS), so no public policies are added for them.
-- ---------------------------------------------------------------------------

alter table public.kittens     enable row level security;
alter table public.orders      enable row level security;
alter table public.order_items enable row level security;
alter table public.contacts    enable row level security;

-- Base privileges (needed when this file is run through psql rather than the
-- dashboard SQL editor, where Supabase's default grants may not apply).
grant usage on schema public to anon, authenticated, service_role;
grant select on public.kittens to anon, authenticated;
grant all on public.kittens, public.orders, public.order_items, public.contacts
  to service_role;

drop policy if exists "Public can view kittens" on public.kittens;
create policy "Public can view kittens"
  on public.kittens for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Storage bucket for kitten photos uploaded from the dashboard
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('kitten-images', 'kitten-images', true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Sample kittens (same 8 shown during preview). Delete them from the
-- dashboard whenever you're ready to list real kittens.
-- ---------------------------------------------------------------------------

insert into public.kittens
  (id, slug, name, breed, gender, color, date_of_birth, price, description, temperament, vaccinated, litter_trained, health_notes, status, featured, images, created_at)
values
  (
    '00000000-0000-4000-8000-000000000001', 'luna-bengal', 'Luna', 'Bengal', 'female', 'Brown rosetted', '2026-04-14', 2200,
    'Luna is a curious little explorer with a beautifully rosetted coat and glittering golden undertones. She loves climbing to the highest spot in the room, then curling up on the nearest warm lap. She has been raised underfoot in our living room and is wonderful with children.',
    'Playful, affectionate, people-oriented', true, true,
    'First and second FVRCP vaccinations complete. Vet-checked twice, dewormed, TICA registered parents screened for PK-def and PRA-b.',
    'available', true,
    array['https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=1200&q=75&fit=crop','https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=1200&q=75&fit=crop'],
    '2026-06-20T10:00:00Z'
  ),
  (
    '00000000-0000-4000-8000-000000000002', 'simba-bengal', 'Simba', 'Bengal', 'male', 'Golden spotted', '2026-04-14', 2400,
    'Simba is the confident leader of his litter: bold, bright, and endlessly entertaining. He fetches toy mice, follows you from room to room, and greets visitors at the door. His large rosettes and warm golden coat turn heads everywhere.',
    'Confident, energetic, loyal', true, true,
    'Vaccinations up to date, dewormed, vet-checked. Parents genetically screened; written health guarantee included.',
    'available', true,
    array['https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=1200&q=75&fit=crop','https://images.unsplash.com/photo-1615789591457-74a63395c990?w=1200&q=75&fit=crop'],
    '2026-06-20T10:05:00Z'
  ),
  (
    '00000000-0000-4000-8000-000000000003', 'cleo-bengal', 'Cleo', 'Bengal', 'female', 'Silver rosetted', '2026-05-02', 2500,
    'Cleo is a rare silver Bengal with striking contrast and emerald eyes. She is gentle and observant, the kitten who watches quietly, then surprises you with a burst of playful zoomies. She adores water play and interactive puzzle toys.',
    'Gentle, intelligent, curious', true, true,
    'Age-appropriate vaccinations complete, dewormed, microchipped before pickup. Health guarantee included.',
    'available', true,
    array['https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1200&q=75&fit=crop','https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=1200&q=75&fit=crop'],
    '2026-06-21T09:00:00Z'
  ),
  (
    '00000000-0000-4000-8000-000000000004', 'milo-bengal', 'Milo', 'Bengal', 'male', 'Brown marbled', '2026-05-02', 1950,
    'Milo''s flowing marbled pattern looks like polished wood grain, every swirl unique. He is the cuddler of the litter and purrs the moment you pick him up. Perfect for a family that wants a Bengal''s beauty with a lap cat''s heart.',
    'Cuddly, easy-going, social', true, true,
    'Vaccinated and dewormed on schedule, vet-checked. Raised with dogs and children.',
    'reserved', false,
    array['https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1200&q=75&fit=crop','https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1200&q=75&fit=crop'],
    '2026-06-21T09:10:00Z'
  ),
  (
    '00000000-0000-4000-8000-000000000005', 'nala-siamese', 'Nala', 'Siamese', 'female', 'Seal point', '2026-04-28', 1200,
    'Nala is a classic seal point Siamese with sapphire-blue eyes and plenty to say. She is chatty, devoted, and happiest perched on a shoulder. She has been raised alongside our Bengals and holds her own beautifully.',
    'Vocal, devoted, affectionate', true, true,
    'Vaccinations current, dewormed, vet-checked twice. Written health guarantee included.',
    'available', false,
    array['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&q=75&fit=crop','https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=1200&q=75&fit=crop'],
    '2026-06-22T11:00:00Z'
  ),
  (
    '00000000-0000-4000-8000-000000000006', 'oliver-british-shorthair', 'Oliver', 'British Shorthair', 'male', 'Blue', '2026-04-20', 1500,
    'Oliver is a plush blue British Shorthair teddy bear with round copper eyes. Calm and unflappable, he is the ideal companion for a quieter home, content to lounge nearby and accept chin scratches with quiet dignity.',
    'Calm, patient, independent', true, true,
    'Fully vaccinated for age, dewormed, vet-checked. Parents GCCF registered.',
    'available', false,
    array['https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=1200&q=75&fit=crop','https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=1200&q=75&fit=crop'],
    '2026-06-23T14:00:00Z'
  ),
  (
    '00000000-0000-4000-8000-000000000007', 'willow-maine-coon', 'Willow', 'Maine Coon', 'female', 'Brown tabby', '2026-04-05', 1700,
    'Willow is a gentle giant in the making, with tufted ears, a magnificent tail, and the sweetest chirping trill. Maine Coons are famously dog-like, and Willow already comes when called and loves a good game of fetch.',
    'Gentle, sociable, dog-like', true, true,
    'Vaccinations current, dewormed, vet-checked. Parents HCM-screened by echocardiogram.',
    'available', false,
    array['https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=1200&q=75&fit=crop','https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=1200&q=75&fit=crop'],
    '2026-06-24T08:30:00Z'
  ),
  (
    '00000000-0000-4000-8000-000000000008', 'leo-bengal', 'Leo', 'Bengal', 'male', 'Charcoal spotted', '2026-05-10', 2100,
    'Leo is a dramatic charcoal Bengal with a dark mask and cape over shimmering spots. He is athletic and clever, already opening treat puzzles designed for adult cats, and melts into a purring puddle at bedtime.',
    'Athletic, clever, affectionate', true, true,
    'Age-appropriate vaccinations complete, dewormed, vet-checked. Health guarantee included.',
    'available', false,
    array['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=75&fit=crop','https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=1200&q=75&fit=crop'],
    '2026-06-25T16:45:00Z'
  )
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Visitor reviews (shown on the home page once approved in the dashboard)
-- ---------------------------------------------------------------------------

create table if not exists public.reviews (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  location   text not null default '',
  rating     int not null check (rating between 1 and 5),
  message    text not null,
  approved   boolean not null default false,
  featured   boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

grant select on public.reviews to anon, authenticated;
grant all on public.reviews to service_role;

drop policy if exists "Public can view approved reviews" on public.reviews;
create policy "Public can view approved reviews"
  on public.reviews for select
  to anon, authenticated
  using (approved = true);
