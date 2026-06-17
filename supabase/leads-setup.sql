-- ============================================================================
-- DigiDZN — leads table setup
-- ============================================================================
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- It creates the `leads` table, enables Row Level Security, and adds a policy
-- that lets anonymous visitors INSERT but blocks SELECT/UPDATE/DELETE so the
-- public anon key can never read other people's submissions.
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
  user_agent  text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx      on public.leads (email);

-- 2. Row Level Security --------------------------------------------------------
alter table public.leads enable row level security;

-- Allow anyone (anon role) to insert a row. No other operations allowed.
drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads"
  on public.leads
  for insert
  to anon
  with check (true);

-- Authenticated users (e.g. your team logged into the dashboard / a backend
-- using the service role) can read all rows. Service role always bypasses RLS.
drop policy if exists "authenticated can read leads" on public.leads;
create policy "authenticated can read leads"
  on public.leads
  for select
  to authenticated
  using (true);

-- ============================================================================
-- Verify
-- ============================================================================
-- After running, you can confirm the table and policies with:
--   select * from public.leads;
--   select polname, polcmd, polroles::regrole[] from pg_policy
--     where polrelid = 'public.leads'::regclass;
-- ============================================================================
