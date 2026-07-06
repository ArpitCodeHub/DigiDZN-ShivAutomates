# DigiDZN Website — Complete Project Context

> Use this document to onboard any AI assistant or developer to the full state of the project. It covers architecture, technology choices, design system, component map, backend, and all standing rules/conventions.

---

## 1. What This Project Is

A **premium marketing website** for **DigiDZN** — a full-service digital marketing agency based in India. Built with React + Vite + TailwindCSS + Framer Motion. The site has:

- A fullscreen hero video entry experience
- A multi-section homepage
- A dedicated Services page
- A Blogs page
- A contact/lead form that submits to Supabase
- A protected `/admin` dashboard for managing enquiries (CRUD)

The goal is editorial, premium, dark-aesthetic agency feel. Not SaaS template. Not feature-grid. Not centered symmetrical layouts.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | TailwindCSS 3 + custom CSS in `src/index.css` |
| Animations | Framer Motion 11 (primary) + GSAP 3 (legacy, light use) |
| Backend | Supabase (auth + database) |
| Fonts | Inter (body), Instrument Serif italic (accent) via Google Fonts |
| Deployment | Vercel (primary) or Netlify — SPA redirects configured in both `vercel.json` and `public/_redirects` |

**Build command:** `npx vite build --mode development` (development mode used for faster iteration builds)

**Dev server:** `npm run dev` (Vite, port 5173)

---

## 3. Repository

- **Primary repo:** `https://github.com/ArpitCodeHub/DigiDZN-ShivAutomates`
- **Secondary repo:** `https://github.com/shiv-automates/DigiDZN.git` (push access needs to be granted to ArpitCodeHub)
- **Branch:** `main`
- **Commit format:** `feat:`, `fix:`, `refine(scope):`, `refactor:`, `chore:` prefixes

---

## 4. Environment Variables

File: `.env.local` (gitignored — never committed)

```
VITE_SUPABASE_URL=https://kxogzoxizmrjqvlvmife.supabase.co
VITE_SUPABASE_ANON_KEY=<208-char JWT starting with eyJhbGciOi...>
```

**Important:** `.env.local` is NOT committed. On deployment platforms (Vercel/Netlify), these must be set manually as environment variables. Vite only reads them at dev-server startup — restart `npm run dev` after any change.

---

## 5. Brand Design System

### Colors (CSS vars in `src/index.css`)
```css
--bg:        #0a0807   /* primary dark background */
--bg-2:      #110d0a   /* secondary dark background */
--brown:     #a87242   /* primary brand copper */
--brown-2:   #c89368   /* mid copper */
--brown-3:   #d4a576   /* light copper */
--brown-deep:#5a3a22   /* deep copper */
```
All borders use `border-[#a87242]/{20,30,40}` brown variants — never white.

### Typography
- **Body:** Inter, `-apple-system` stack
- **Accent / display italic:** `.font-serif-italic` class → Instrument Serif italic
- **Hierarchy pattern:** large left-aligned headline + serif italic accent word + white/55 subtext
- **Heading sizing:** use `clamp()` for large display text, e.g. `fontSize: 'clamp(36px, 5.5vw, 68px)'`

### Glassmorphism
```jsx
style={{
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
}}
```
Plus `border border-[#a87242]/20` brown border. Apply to all cards/panels.

### Card Hover
Use CSS `.card-hover` class (defined in `src/index.css`) — NOT Framer Motion `whileHover={{ y: -X }}`. The Framer version conflicts with `transition-all` and causes glitches.

```css
.card-hover {
  will-change: transform;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), ...;
}
.card-hover:hover { transform: translateY(-5px); }
```

### Tailwind Custom Breakpoints
```
xs: 375px | sm: 480px | md: 768px | lg: 1024px | xl: 1440px | 2xl: 2560px
```

### Section Pattern
**Do NOT use the `<Section>` wrapper component for tall content.** It uses `useInView` with `amount: 0.15` — breaks initial render for tall sections (blog grid, deep dives). Use plain `<section>` elements with `viewport={{ once: true, amount: 0 }}` on individual cards.

---

## 6. File & Folder Structure

```
src/
  App.tsx                        # Root — routing logic, admin lazy-load, shell navbars/footers
  main.tsx                       # React entry point
  index.css                      # Global CSS, brand vars, .card-hover, .font-serif-italic, video CSS
  components/
    Homepage.tsx                 # Full homepage layout + Footer + FinalCTA
    PositioningSection.tsx       # Hero text section
    AboutSection.tsx             # Agency about section
    ClientOutcomesSection.tsx    # Anonymised case studies (sidebar tabs + metrics panel) — id: client-outcomes
    GrowthEcosystemSection.tsx   # Services ecosystem (editorial 5/7 split, hover detail panel)
    AISectionAndGEO.tsx          # AI + GEO section
    TestimonialsSection.tsx      # Client voice testimonials (sidebar + stars + quote style)
    TeamSection.tsx              # Team grid — founders large, rest hidden behind expand button
    LeadFormModal.tsx            # Contact/lead capture modal (submits to Supabase)
    TransitionOverlay.tsx        # Post-video transition overlay
    VideoEntry.tsx               # Fullscreen hero video (landscape on desktop, vertical on mobile)
    ServicesPage.tsx             # Full services page with 8 services, ecosystem map, deep dives
    BlogsPage.tsx                # Blog listing page with thumbnails + category filters
    ContentGalleryItem.tsx       # (used by BlogsPage)
    admin/
      AdminPage.tsx              # Admin route orchestrator — checks Supabase auth session
      AdminLogin.tsx             # Login form (email + password)
      AdminDashboard.tsx         # Full CRUD dashboard for leads
  sections/
    Section.tsx                  # Generic Section wrapper (DO NOT use for tall content — see §5)
  styles/
    animations.css               # GSAP/Framer supplementary styles, video-entry CSS
  utils/
    supabaseClient.ts            # Creates and exports `supabase` client (env-safe, never throws at load)
    leads.ts                     # All Supabase CRUD helpers: submitLead, fetchLeads, updateLead, deleteLead, createLead
    responsive.ts
    animations.ts
    index.ts                     # Re-exports supabase client
  data/
    blog-thumbnails.ts           # Blog thumbnail manifest (88 entries, local paths under /public/blog-thumbnails/)

public/
  videos/
    final-digidzn.mp4            # Landscape hero video (desktop)
    digidzn-vertical-final.mp4   # Vertical hero video (mobile < 768px)
    digi-WOwatermark.mp4         # Alternate / watermark video (unused in main path)
  blog-thumbnails/               # 89 local blog thumbnails (.jpg/.jpeg/.png)
  blog-links/
    digiDZN Blog links.pdf       # Source PDF of 88 blog URLs
  case-studies/                  # 7 case study images (one per anonymised client)
    fashion&apparel-brand.png
    fitness&wellness-brand.png
    interiordesign-brand.png
    driving-lead-gen_interiordesign-brand.png
    stronger-digital-presence_apparel-brand.png
    realestate-brand.png
    arcade&playzone-brand.png
  team_photos/                   # 30 team member photos (.jpeg/.jpg/.png/.webp)

supabase/
  leads-setup.sql                # Idempotent SQL: creates leads table + RLS policies. RUN THIS on every new Supabase project.
  README.md                      # Setup guide for new Supabase projects

scripts/
  extract-case-study-images.mjs  # Renders PDF pages to PNG (pdf-to-img)
  crop-case-study-images.mjs     # Crops rendered pages into per-case images (sharp)
  inspect-pdf-text.mjs           # Extracts text per page for verification (pdfjs-dist)
  fetch-blog-thumbnails.mjs      # Fetched CMS thumbnails from DigiDZN API
  fill-missing-thumbnails.mjs    # Fills remaining with Unsplash placeholders

vercel.json                      # SPA rewrite: all routes → index.html
public/_redirects                # Netlify equivalent of vercel.json
```

---

## 7. Routing

App.tsx handles routing with a simple state machine (`PageView = 'home' | 'services' | 'blogs'`) — **no React Router**. Navigation is done by calling `setCurrentPage()`.

The **`/admin` route** is detected at module load time:
```ts
const isAdminRoute = window.location.pathname.startsWith('/admin')
```
If true, the app renders `<AdminPage />` (lazy-loaded via `React.lazy`) and skips the video entry and marketing chrome entirely.

**Section anchors** (used in nav):
- `#about` — About section
- `#client-outcomes` — Client Outcomes section
- `#testimonials` — Testimonials section

---

## 8. Homepage Section Order

```
VideoEntry (fullscreen, plays once)
→ TransitionOverlay
→ Homepage
  1. Navbar (fixed, glassmorphism, brand DIGIDZN wordmark)
  2. PositioningSection (hero headline)
  3. AboutSection
  4. ClientOutcomesSection (id: client-outcomes) ← "Our Works" navbar link
  5. GrowthEcosystemSection
  6. AISectionAndGEO
  7. TestimonialsSection (id: testimonials)
  8. TeamSection
  9. FinalCTA
  10. Footer (Contact → opens LeadFormModal | Admin → /admin)
```

---

## 9. Services Page

**Route:** App state `currentPage === 'services'`

8 services: SEO+GEO, Content, Influencer, Branding, AI Creative, Social, Performance, Ecommerce.

Each service has:
- `id`, `slug`, `icon` (01-08), `color`, `tagline`, `headline`
- `what`, `why`, `approach` — 3 explanatory blocks
- `deliverables[]`
- `framework` — step chain string
- `image` — Unsplash URL at `w=2400&q=85`
- `relatedWork[]` — 2 real case studies mapped to the service, each with `title`, `outcome`, `tag`, `image` (path under `/public/case-studies/`)

Ecosystem Map: hover any service card to see connections. Click → smooth scroll to deep dive.

Related Work cards: thumbnail-left layout with brand-tinted gradient fallback (same fallback pattern as case-study cards elsewhere).

---

## 10. Blogs Page

**Route:** App state `currentPage === 'blogs'`

- 88 blog posts from DigiDZN's CMS
- Local thumbnails in `/public/blog-thumbnails/`
- Thumbnail manifest at `src/data/blog-thumbnails.ts`
- Sort: blogs with thumbnails first, no-thumbnail blogs at bottom
- Category filter tabs
- Initial render fix: uses plain `<section>` (not `<Section>` wrapper) to avoid `useInView` initial-render invisibility

---

## 11. Client Outcomes Section (`ClientOutcomesSection.tsx`)

6 real DigiDZN client engagements, anonymised by industry. Sidebar tabs + main panel. Each story has:
- `industry`, `caseLabel`, `serviceTag`
- `approach` — used as editorial quote
- `headlineMetric` — big number anchor
- `supporting[]` — 3 supporting metrics in a row
- `image` — `/case-studies/<filename>`

Case-study image filename → industry mapping:
| File | Case |
|---|---|
| `fashion%26apparel-brand.png` | Fashion E-Commerce |
| `fitness%26wellness-brand.png` | Fitness & Wellness |
| `interiordesign-brand.png` | Interior Design (authority) |
| `driving-lead-gen_interiordesign-brand.png` | Interior Design (lead gen) |
| `stronger-digital-presence_apparel-brand.png` | Apparel Brand |
| `realestate-brand.png` | Real Estate |
| `arcade%26playzone-brand.png` | Family Entertainment |

**Note:** `&` in filenames is URL-encoded as `%26` in all `src` attributes.

---

## 12. Testimonials Section (`TestimonialsSection.tsx`)

6 testimonials, written in the client's voice, grounded in real case-study outcomes. Anonymised (no real names). Layout: sidebar with role/industry + main panel with 5 stars, large blockquote (serif italic quotation marks), proof-point chip (real metric), author block. Identical visual style to the original design (not the outcomes-metrics style).

---

## 13. Team Section (`TeamSection.tsx`)

30 members total:
- **Founders (2):** Sangeeta Verma (Founder Director) + Manish Verma (Co-Founder) — shown as large editorial founder cards
- **Specialists (28):** hidden behind "Meet the full team" expand button with AnimatePresence + stagger

Photos live in `/public/team_photos/`. Names with spaces in filenames are URL-encoded (`%20`).

Two members had no photos until late in development:
- **Aastha Kapoor** → `/team_photos/Aastha%20Kapoor.jpeg`
- **Abhay Bhardwaj** → `/team_photos/Abhay%20Bhardwaj.webp`

---

## 14. Lead Form (`LeadFormModal.tsx` + `src/utils/leads.ts`)

Public form fields: `name` (required), `email` (required), `company`, `message`.

Calls `submitLead()` from `src/utils/leads.ts` which:
1. Trims/normalises input
2. Calls `supabase.from('leads').insert(payload).select('id')`
3. If 0 rows returned (silent RLS block) → returns `ok: false` with actionable error
4. Captures `source: 'homepage'` and `user_agent` automatically

---

## 15. Admin Dashboard (`/admin`)

**Access:** Footer link "Admin" → `/admin` → `AdminPage.tsx`

**Auth:** Supabase Email/Password. Only `sangeeta@digidzn.com` can sign in (both via Supabase auth + RLS email check on every query).

**Dashboard features:**
- Stats row: leads in view, new, today, last 7 days
- Search: debounced, searches name/email/company/message
- Status filter: all / new / contacted / qualified / closed / archived
- Lead table: date, name, email, company, source, status, edit/delete
- Desktop: full table row | Mobile: card layout
- Modals: View (full details + mailto link), Edit (all fields + status + notes), Delete (confirmation), Create (manual lead entry)
- Sign out button in header

**Lead statuses:** `new` → `contacted` → `qualified` → `closed` → `archived`

---

## 16. Supabase Schema

### Table: `public.leads`

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK, auto-generated |
| `created_at` | `timestamptz` | auto `now()` |
| `name` | `text` | required, 1–200 chars |
| `email` | `text` | required, regex validated |
| `company` | `text` | optional |
| `message` | `text` | optional |
| `source` | `text` | default `'homepage'`, `'manual'` for admin-created |
| `user_agent` | `text` | captured from browser |
| `status` | `text` | enum: new/contacted/qualified/closed/archived |
| `notes` | `text` | internal admin notes |

### RLS Policies

| Role | INSERT | SELECT | UPDATE | DELETE |
|---|---|---|---|---|
| `anon` (public) | ✅ | ❌ | ❌ | ❌ |
| `authenticated` — `sangeeta@digidzn.com` | ✅ | ✅ | ✅ | ✅ |
| `authenticated` — anyone else | ❌ | ❌ | ❌ | ❌ |

**Critical:** Run `supabase/leads-setup.sql` on every new Supabase project before the form or admin will work.

### Admin user (must be created manually in Supabase Dashboard)
- Email: `sangeeta@digidzn.com`
- Password: `admin@digidzn123`
- Auto Confirm: ON

---

## 17. Video Entry

`VideoEntry.tsx` picks the video source **once at mount** based on `window.innerWidth < 768`:
- **Desktop:** `/videos/final-digidzn.mp4` (landscape)
- **Mobile:** `/videos/digidzn-vertical-final.mp4` (vertical)

Mobile uses `object-fit: contain` (not `cover`) so the full DIGIDZN logo is always visible without side-cropping.

Skip button fades in after 3s. Mute/unmute toggle in bottom-right. After video ends → transition overlay → homepage.

---

## 18. Known Issues / Standing TODOs

1. **Supabase SQL not run on new project** — `supabase/leads-setup.sql` must be run manually on each new project. Without it, form submissions silently fail and admin CRUD is blocked.

2. **`shiv-automates/DigiDZN` repo push** — requires `ArpitCodeHub` to be granted write access to that repo. Remote `shiv` is already configured locally.

3. **Footer links Privacy/Terms** — removed. When legal pages are ready, re-add them to the footer link arrays in `Homepage.tsx` and `App.tsx` (ServicesShell + BlogsShell footers).

4. **Stale git deletions** (already committed as of latest push) — `Gunnit Singh.jpeg`, `Hema Batra.jpeg`, `Laxmi.jpeg` removed from `public/team_photos/` in an earlier session and tracked as deletions. The team section still references these names but their photo paths must be checked/updated if new files are provided.

5. **Contact form → Supabase** — works in local dev with correct `.env.local`. On deployed site, Vercel/Netlify env vars must be set to the same values.

---

## 19. Key Code Conventions

- **No React Router** — routing is a simple `useState` page machine in `App.tsx`
- **No emojis sitewide** — replaced with numbered badges (01–08) and SVG icons
- **Brown borders everywhere** — `border-[#a87242]/{20,30,40}`, never white borders
- **Glassmorphism everywhere** — `bg-white/[0.03]` + `backdrop-blur-xl` + brown borders
- **All Framer Motion transitions:** `transition-[color,border-color,background-color,opacity] duration-200 ease-out` instead of `transition-all`
- **Hover:** `.card-hover` CSS class — never `whileHover={{ y: -X }}`
- **Large display text:** `clamp()` for `fontSize`, `letterSpacing: '-0.02em'` or tighter
- **Images with `&` in filenames:** URL-encode as `%26` in src attributes
- **Images with spaces in filenames:** URL-encode as `%20`
- **All Supabase helpers** surface real errors (not silent failures) by using `.select('id')` on mutations and checking `data.length === 0`
- **AdminPage is lazy-loaded** (`React.lazy`) — public site doesn't import Supabase on first paint
- **`Section` wrapper bug** — `src/sections/Section.tsx` uses `useInView amount: 0.15` which fails on tall content. Workaround: use plain `<section>` + `viewport={{ once: true, amount: 0 }}` on cards

---

## 20. Section `useInView` Bug — Details

`src/sections/Section.tsx` wraps content in a Framer Motion div with `useInView({ amount: 0.15 })`. For tall content (blog grid, service deep dives, etc.) the section height exceeds the viewport so `0.15` threshold is never crossed on initial render. The content stays invisible. Fix pattern used throughout the codebase:

```tsx
// BAD — wrapping tall content in Section:
<Section id="blogs" ...>
  {items.map(...)}
</Section>

// GOOD — plain section element, viewport at card level:
<section id="blogs" ...>
  {items.map((item, i) => (
    <motion.div
      viewport={{ once: true, amount: 0 }}
      ...
    />
  ))}
</section>
```

---

## 21. Case Study Data Reference

7 real DigiDZN client case studies (anonymised). These power ClientOutcomesSection, TestimonialsSection, and ServicesPage related-work cards.

| Client | Industry | Key Metric | Services |
|---|---|---|---|
| Fashion E-Commerce | Fashion & Apparel | ₹57.48L+ sales, 340K visits | Performance + Social, Meta Ads |
| Family Entertainment | Entertainment | 5K+ profile visits | Social + Content |
| Apparel Brand | Fashion | 205K+ reach, 25K engagements | Brand Growth, Social |
| Real Estate | Real Estate | 150+ qualified leads | Lead Gen, Performance |
| Interior Design (authority) | Interior Design | 208K+ impressions, 12.6K followers | Brand Building, Social |
| Fitness & Wellness | Fitness | 550K+ reach, 88K video views | Content + Social |
| Interior Design (lead gen) | Interior Design | 355 leads, ₹148.88 CPL | Performance, Lead Gen |

---

*Last updated: July 2026. Latest commit on `main`: see git log.*
