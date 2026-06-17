# Supabase setup

The lead form (`src/components/LeadFormModal.tsx`) inserts rows into a Supabase
`leads` table via `src/utils/leads.ts`.

## One-time setup

1. Open your Supabase project → **SQL Editor** → **New query**.
2. Paste the contents of [`leads-setup.sql`](./leads-setup.sql) and run it.
3. Confirm the table exists under **Table Editor → `leads`**.

That single migration creates the table, indexes, and Row Level Security
policies. The anon key (already in `.env.local` as `VITE_SUPABASE_ANON_KEY`)
can only `INSERT` — it cannot read existing rows. Reading is restricted to
authenticated dashboard users and the service role.

## Where leads land

After someone submits the contact form, you'll see the row appear in:

- Supabase Dashboard → **Table Editor → leads**
- Or via SQL: `select * from public.leads order by created_at desc;`

## Optional: email notifications on new leads

If you want an email every time a lead comes in, add a Supabase Database
Webhook or Edge Function. Quickest path:

- Dashboard → **Database → Webhooks → Create a new webhook**
- Table: `leads`, Events: `INSERT`
- Type: `HTTP Request` to a Resend/EmailJS endpoint, or hook into Zapier/Make.

This is optional — leads are already persisted in the database.
