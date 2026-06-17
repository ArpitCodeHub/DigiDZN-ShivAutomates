-- ============================================================================
-- DigiDZN — leads table setup
-- ============================================================================
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- It creates the `leads` table, enables Row Level Security, and adds policies:
--   * anon role: INSERT only (public form submissions)
--   * authenticated admin (sangeeta@digidzn.com): SELECT / INSERT / UPDATE / DELETE
-- It is idempotent — safe to re-run.
-- ============================================================================

-- 1. Table ---------------------------------------------------------------------
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (length(trim(name)) between 1 and 200),
  email       text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company     text,
  message     text,
  source      text default 'homepage',
  user_agent  text,
  status      text default 'new'  check (status in ('new','contacted','qualified','closed','archived')),
  notes       text
);

-- Add columns if upgrading from an older schema (idempotent)
alter table public.leads add column if not exists status text default 'new'
  check (status in ('new','contacted','qualified','closed','archived'));
alter table public.leads add column if not exists notes text;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx      on public.leads (email);
create index if not exists leads_status_idx     on public.leads (status);

-- 2. Row Level Security --------------------------------------------------------
alter table public.leads enable row level security;

-- Helper: only the admin email may operate as an authenticated admin.
-- Update the email here if ownership changes.
-- Compared against the JWT email claim, NOT the auth.users table directly,
-- so it works at policy-evaluation time without joins.
--
-- Anyone (anon role) can INSERT. They cannot read what others have submitted.
drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads"
  on public.leads
  for insert
  to anon
  with check (true);

-- Authenticated admin (Sangeeta) can do everything else.
drop policy if exists "authenticated can read leads" on public.leads;

drop policy if exists "admin can select leads" on public.leads;
create policy "admin can select leads"
  on public.leads
  for select
  to authenticated
  using ((auth.jwt() ->> 'email') = 'sangeeta@digidzn.com');

drop policy if exists "admin can insert leads" on public.leads;
create policy "admin can insert leads"
  on public.leads
  for insert
  to authenticated
  with check ((auth.jwt() ->> 'email') = 'sangeeta@digidzn.com');

drop policy if exists "admin can update leads" on public.leads;
create policy "admin can update leads"
  on public.leads
  for update
  to authenticated
  using ((auth.jwt() ->> 'email') = 'sangeeta@digidzn.com')
  with check ((auth.jwt() ->> 'email') = 'sangeeta@digidzn.com');

drop policy if exists "admin can delete leads" on public.leads;
create policy "admin can delete leads"
  on public.leads
  for delete
  to authenticated
  using ((auth.jwt() ->> 'email') = 'sangeeta@digidzn.com');

-- ============================================================================
-- Admin user creation (manual step — do this after running the SQL above)
-- ============================================================================
-- 1. Supabase Dashboard → Authentication → Users → "Add user" → "Create new user"
-- 2. Email:    sangeeta@digidzn.com
--    Password: admin@digidzn123
--    Auto Confirm User: YES (so login works immediately, no email confirmation step)
-- 3. (Optional, recommended) Authentication → Providers → Email
--    → turn OFF "Enable Sign-Ups" so no one else can register.
-- ============================================================================

-- ============================================================================
-- Verify
-- ============================================================================
--   select count(*) from public.leads;
--   select polname, polcmd, polroles::regrole[] from pg_policy
--     where polrelid = 'public.leads'::regclass
--     order by polname;
-- ============================================================================
