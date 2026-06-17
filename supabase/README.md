# Supabase setup

The DigiDZN site uses Supabase for two things:

1. **Storing leads** — public form submissions (`/` contact form) insert into `public.leads`.
2. **Admin dashboard** — `/admin` route lets the team sign in and manage enquiries (CRUD).

Both are governed by the same Row Level Security setup in [`leads-setup.sql`](./leads-setup.sql).

---

## One-time setup

### 1. Create the table and policies

- Open https://supabase.com/dashboard → your project
- Sidebar → **SQL Editor** → **New query**
- Paste the contents of [`leads-setup.sql`](./leads-setup.sql) and click **Run**
- Confirm under **Table Editor** → `leads` exists

The script is idempotent — safe to re-run if anything changes.

### 2. Create the admin user

- Sidebar → **Authentication** → **Users** → **Add user** → **Create new user**
- **Email:** `sangeeta@digidzn.com`
- **Password:** `admin@digidzn123`
- **Auto Confirm User:** ✅ ON (so the user can sign in immediately, no email confirmation)
- Click **Create user**

### 3. Lock down sign-ups (recommended)

So no one else can register an account:

- Sidebar → **Authentication** → **Providers** → **Email**
- Turn **Enable Sign-Ups** OFF
- **Save**

Existing users (Sangeeta) can still sign in; new sign-ups are blocked.

---

## How access works

| Role                                 | Can INSERT      | Can SELECT      | Can UPDATE      | Can DELETE      |
| ------------------------------------ | --------------- | --------------- | --------------- | --------------- |
| `anon` (public form on the website)  | ✅ yes          | ❌ no           | ❌ no           | ❌ no           |
| `authenticated` — `sangeeta@digidzn.com` | ✅ yes      | ✅ yes          | ✅ yes          | ✅ yes          |
| `authenticated` — anyone else        | ❌ no           | ❌ no           | ❌ no           | ❌ no           |

The admin email is hard-coded into the RLS policies. Even if someone else manages
to sign in, they cannot read, update, or delete leads.

If you ever need to change who is the admin, edit the email in
`leads-setup.sql` (search for `sangeeta@digidzn.com`) and re-run the script.

---

## Where leads land

After someone submits the contact form on the public site:

- **Admin dashboard:** open `/admin`, sign in, the lead appears in the table
- **Supabase dashboard:** Table Editor → `leads`
- **SQL:** `select * from public.leads order by created_at desc;`

---

## Optional: email notifications on new leads

If you want an email every time a lead comes in:

- Supabase Dashboard → **Database** → **Webhooks** → **Create a new webhook**
- Table: `leads`, Events: `INSERT`
- Type: `HTTP Request` to a Resend / EmailJS / Zapier / Make endpoint

This is optional — leads are already persisted in the database and visible in
the admin dashboard.
