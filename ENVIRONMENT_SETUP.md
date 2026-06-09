# DigiDZN Homepage - Environment Configuration Guide

## Overview

This document explains how to configure environment variables and Supabase credentials for the DigiDZN Homepage Phase 1 project.

---

## Environment Variables

### What Are They?

Environment variables are configuration values that change based on the environment (local development, staging, production). They're stored in `.env` files and loaded when the application starts.

### Vite Environment Variables

In this project, we use Vite, which requires environment variables to be prefixed with `VITE_` to expose them to the client-side code.

**Example:** `VITE_SUPABASE_URL` → accessible as `import.meta.env.VITE_SUPABASE_URL`

---

## Files

### `.env.example`
- **Purpose**: Template file showing all required environment variables
- **Location**: Project root
- **Usage**: Reference this file when setting up local development
- **Commit**: YES (committed to version control)
- **Content**: No sensitive data

### `.env.local`
- **Purpose**: Actual environment variables for local development
- **Location**: Project root
- **Usage**: Fill in your actual Supabase credentials here
- **Commit**: NO (in .gitignore, never committed)
- **Content**: Sensitive data (API keys, URLs)

### `.env.production` (optional)
- **Purpose**: Production-specific environment variables
- **Usage**: Set when deploying to production
- **Commit**: NO (never committed)
- **Note**: Should be configured in your hosting platform instead (Vercel, Netlify, etc.)

---

## Supabase Configuration

### What Is Supabase?

Supabase is an open-source Firebase alternative that provides:
- PostgreSQL database hosting
- Authentication
- Real-time subscriptions
- Storage for files/images
- Edge functions

For DigiDZN, we use Supabase to store lead form submissions.

### Getting Supabase Credentials

1. **Create or Log In to Supabase**
   - Go to [supabase.com](https://supabase.com)
   - Sign up or log in with your account

2. **Create a New Project**
   - Click "New project"
   - Choose a name (e.g., "DigiDZN Homepage")
   - Set password and region
   - Click "Create new project"

3. **Wait for Project Setup**
   - This takes a few minutes
   - You'll see a dashboard when ready

4. **Get Your API Credentials**
   - Click "Settings" in the sidebar
   - Click "API"
   - You'll see:
     - **Project URL** (labeled "URL") - This is `VITE_SUPABASE_URL`
     - **anon (public) key** - This is `VITE_SUPABASE_ANON_KEY`

### Setting Up Environment Variables

1. **Copy `.env.example` to `.env.local`**
   ```bash
   # On Windows (PowerShell)
   Copy-Item .env.example .env.local
   
   # On macOS/Linux
   cp .env.example .env.local
   ```

2. **Edit `.env.local` with Your Credentials**
   ```bash
   # Open .env.local in your editor
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-very-long-api-key-here
   ```

3. **Save the File**
   - The development server will automatically reload with new variables

### Verifying Setup

1. **Check Console Output**
   - Start the development server: `npm run dev`
   - Look for warnings in the console
   - If you see "Supabase credentials not configured", variables aren't set correctly

2. **Test in Browser Console**
   ```javascript
   // In browser DevTools console, you can check if Supabase is initialized:
   // Note: This won't work until a component imports the supabase client
   ```

---

## Supabase Database Setup

### Create the Leads Table

1. **In Supabase Dashboard**
   - Go to your project dashboard
   - Click "SQL Editor" in the sidebar
   - Click "New query"

2. **Paste This SQL**
   ```sql
   CREATE TABLE leads (
     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     company TEXT,
     message TEXT,
     source TEXT DEFAULT 'homepage-cta',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     ip_address INET,
     user_agent TEXT,
     contact_status TEXT DEFAULT 'new'
   );

   -- Create indexes for faster queries
   CREATE INDEX idx_leads_email ON leads(email);
   CREATE INDEX idx_leads_created_at ON leads(created_at);

   -- Enable row-level security
   ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

   -- Allow public inserts (for form submissions)
   CREATE POLICY "Allow public inserts"
     ON leads
     FOR INSERT
     WITH CHECK (true);

   -- Disallow public reads and updates (optional - tighten security later)
   -- CREATE POLICY "Disallow public reads"
   --   ON leads
   --   FOR SELECT
   --   USING (false);
   ```

3. **Run the Query**
   - Click "Run" (Ctrl+Enter)
   - You should see success message

4. **Verify Table Creation**
   - Click "Table Editor" in the sidebar
   - You should see "leads" table listed

### Test Lead Insertion

1. **In Table Editor**
   - Click the "leads" table
   - Click "Insert row"
   - Fill in test data:
     - Name: "Test User"
     - Email: "test@example.com"
     - Message: "Test message"
   - Click "Save"
   - Verify the row appears in the table

---

## CORS Configuration (If Needed)

### What Is CORS?

CORS (Cross-Origin Resource Sharing) controls which websites can access your Supabase API. By default, Supabase allows requests from any origin for public (anon) API access.

### Check CORS Settings

1. **In Supabase Dashboard**
   - Go to "Settings" → "API"
   - Look for "CORS" configuration (usually already set up)
   - Default: allows all origins for public access

2. **For Production**
   - Restrict CORS to your domain only
   - Go to "Settings" → "API" → Configure CORS
   - Add your production domain (e.g., `https://digidzn.com`)

---

## Development Workflow

### Starting Development

```bash
# 1. Install dependencies (if not done)
npm install

# 2. Set environment variables in .env.local
# (Use the guide above)

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

### Making Changes

- Edit component files in `/src`
- Changes auto-reload in browser (hot module replacement)
- Console shows errors in real-time

### Testing Form Submission

1. **Fill out lead form on homepage**
2. **Submit**
3. **Check Supabase Dashboard**
   - Go to "Table Editor" → "leads"
   - New row should appear with your submitted data

---

## Production Deployment

### Before Going Live

1. **Create `.env.production` or Configure in Hosting**
   - Supabase credentials should be the same or a production-specific key
   - Most hosting platforms (Vercel, Netlify) have dashboard for environment variables

2. **Update Supabase Security Rules**
   - Restrict CORS to your production domain
   - Consider tightening row-level security policies

3. **Test Thoroughly**
   - Form submission
   - Data appears in Supabase
   - Error handling for network failures

### Deployment Examples

**Vercel:**
1. Connect GitHub repo to Vercel
2. In Vercel dashboard, go to Settings → Environment Variables
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. Deploy

**Netlify:**
1. Connect GitHub repo to Netlify
2. In Netlify dashboard, go to Site settings → Environment
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. Deploy

**Self-hosted:**
1. Set environment variables on server before starting app
2. Use container env vars or `.env` file (only if server-side rendering)
3. Rebuild and deploy

---

## Security Best Practices

### What NOT To Do

- ❌ Never commit `.env.local` to Git
- ❌ Never share your API keys publicly
- ❌ Never put production keys in `.env.example`
- ❌ Never log API keys in console
- ❌ Never expose API keys in client-side code unnecessarily

### What TO Do

- ✅ Always use `.gitignore` to exclude `.env.local`
- ✅ Use different keys for development and production
- ✅ Rotate API keys if compromised
- ✅ Enable Row-Level Security (RLS) in Supabase
- ✅ Validate and sanitize form inputs before submission
- ✅ Use HTTPS for all connections

### For Sensitive Operations

If you need to perform sensitive operations (e.g., delete leads, admin tasks):

1. **Create a Service Role Key**
   - In Supabase: Settings → API → Service role key
   - Use this ONLY on backend/server-side code
   - Never expose to client-side

2. **Use Environment Variables**
   - Without `VITE_` prefix for backend-only vars (Node.js)
   - Example: `SUPABASE_SERVICE_ROLE_KEY` (not exposed to client)

---

## Troubleshooting

### "Supabase credentials not configured" Warning

**Problem**: You see this message in the console

**Solutions**:
1. Check `.env.local` file exists in project root
2. Verify variable names: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Check values are not empty
4. Restart development server after updating `.env.local`

### Form Submission Fails

**Problem**: Form submits but data doesn't appear in Supabase

**Solutions**:
1. Check browser console for errors
2. Verify Supabase credentials are correct
3. Check "leads" table exists in Supabase dashboard
4. Verify CORS is configured in Supabase
5. Check Supabase project is active (not paused)

### "No such table: public.leads"

**Problem**: Supabase returns database error

**Solutions**:
1. Create the leads table (see "Create the Leads Table" section above)
2. Verify table is in "public" schema
3. Check row-level security policies aren't blocking inserts

### API Key Looks Invalid

**Problem**: Getting authentication errors

**Solutions**:
1. Double-check you copied the FULL API key (very long string)
2. Verify you're using the "anon" key, not "service_role"
3. Test the API key in Supabase dashboard Settings → API
4. Generate a new key if still having issues

---

## Environment Variable Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Yes | Supabase project URL | `https://abc123.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase anonymous API key | `eyJhbGc...` (very long) |

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [CORS Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

## Support

If you encounter issues:

1. Check this guide first
2. Review console error messages
3. Check Supabase status page
4. Test Supabase connectivity directly in dashboard
5. Contact development team with error details
