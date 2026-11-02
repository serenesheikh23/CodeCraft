# Code Craft

> We build fast, reliable websites and web apps for small businesses, with an admin you can actually run yourself.

A production-grade digital studio website with a full admin CMS.

**Live:** [codecraftdigitalstudio.vercel.app](https://codecraftdigitalstudio.vercel.app) *(formerly codeeecrafttt.vercel.app)*

Next.js 15 · React 19 · TypeScript · Prisma · Turso · NextAuth.js · Tailwind · Vitest · Vercel · Vercel Blob

---

## Lighthouse

Measured on PageSpeed Insights against the main deployment, mobile, Moto G Power emulation, Slow 4G throttling.

| Metric | Mobile |
| --- | --- |
| Performance | 98 |
| Accessibility | 97 |
| Best Practices | 100 |
| SEO | 100 |
| Agentic Browsing | 2/2 |

**Mobile FCP 0.8s · LCP 0.8s · TBT 0ms · CLS 0**

Mobile LCP history: 5.3s → 2.4s (WebP conversion and priority on the hero image) → 0.8s (after removing the quote estimator and stack diagram from the homepage and server-izing ten section renderers).

> Desktop has not been re-measured since the redesign.

---

## By the numbers

| Metric | Value |
| --- | --- |
| API route handlers | 56 (20 GET · 15 POST · 11 PUT · 10 DELETE) |
| Database models | 12 Prisma models mapped to 12 Turso tables |
| Public routes | 9 (`/`, `/projects`, `/projects/[slug]`, `/services`, `/legal/[slug]`, `/p/[slug]`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`) |
| Static pages per build | 40 |
| Shared First Load JS | 103 kB |
| `/` First Load JS | 120 kB |
| Vitest tests | 8 |
| Production build | ~14s |

---

## What it does

Agency marketing site with a fully self-service admin CMS. Editors log in at `/admin/login` and manage:

- **Services and add-ons** — CRUD with feature lists
- **Projects** — case studies with hero image, per-slide crop, live links, tech stack
- **Testimonials** — client quotes with author/role
- **Navigation and footer links** — reorderable
- **Legal and custom pages** — dynamic `/legal/[slug]` and `/p/[slug]` routing
- **Homepage sections** — reorderable, individually enabled/disabled
- **Site settings** — logo, contact info, social links

The public site renders sections dynamically from the database — adding a "Pricing" section in the admin panel makes it appear on the homepage without a redeploy.

---

## Technical highlights

- **Full-stack TypeScript** — type-safe contracts between Prisma schema, API handlers, and React components
- **Server Components with client islands** — Next.js 15 App Router; only interactive components hydrate. Ten section renderers were converted to server components during the redesign.
- **JWT session auth** — NextAuth credentials provider with bcrypt; `/admin/*` protected at the middleware layer
- **Image pipeline** — server-side WebP conversion via sharp, then `put()` to Vercel Blob. Responsive `next/image` with `sizes` and priority on the LCP image.
- **Crop on upload** — hero image and each slideshow slide support drag-to-pan and 1×–3× zoom in the admin. Crop is encoded inside the existing `imageUrl` / `images` text fields as JSON; no schema change, backward compatible with plain URLs.
- **Security headers** — HSTS, CSP, X-Frame-Options via `next.config.js`
- **Rate limiting** — 10 uploads / 10 min / IP, 3 contact submissions / 10 min / IP
- **Automated tests** — 8 Vitest route tests against a real Prisma client

---

## Architecture

```text
src/
  app/                    Next.js App Router
    (public)/             Homepage, projects, services, legal, custom pages
    admin/                Login + dashboard CRUD
    api/                  56 route handlers
  components/             31 React components
    sections/             Homepage section renderers
    admin/                CMS UI (includes ImageUpload, MultiImageUpload with crop)
  lib/                    auth, prisma, crop helpers
  middleware.ts           Route protection

prisma/
  schema.prisma           12 models
  seed.ts                 Demo content
```

**Data flow:** React pages fetch `/api/*`, route handlers use Prisma, then Turso (SQLite at the edge). Admin mutations require a valid NextAuth session; middleware redirects unauthenticated requests to `/admin/login` before they reach any protected handler.

**Deployment:** Vercel (edge functions + static pages) · Turso (libSQL) · Vercel Blob (image storage) · Resend (transactional email).

---

## Tech stack

| Layer | Tools |
| --- | --- |
| Language | TypeScript |
| Framework | Next.js 15 (App Router), React 19 |
| Styling | Tailwind CSS, Lucide React |
| Animation | Framer Motion — admin forms only; no public page imports it |
| Database | SQLite via Prisma 6, hosted on Turso (libSQL) |
| Auth | NextAuth.js (Credentials + bcrypt) |
| Email | Resend |
| Image processing | sharp (WebP conversion on upload) + Vercel Blob (persistent storage) |
| Testing | Vitest |
| Deploy | Vercel |

---

## Run locally

Clone the repo, install, copy env, migrate, seed, run.

```bash
git clone https://github.com/serenesheikh23/CodeCraft
cd CodeCraft
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Fill `.env` with `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `RESEND_API_KEY`, `BLOB_READ_WRITE_TOKEN`.

`BLOB_READ_WRITE_TOKEN` is issued by Vercel when you create a Blob store and connect it to the project (**Storage → Create → Blob → Public access → enable "Add a read-write token env var"**). Without it, `/api/upload` returns 500.

Open [http://localhost:3000](http://localhost:3000). Admin panel at `/admin/login`.

---

## Test

```bash
npm test
```

8 Vitest tests covering projects, services, testimonials, sections, settings, nav links, footer links, and legal pages.

---

## Build

```bash
npm run build
```

Generates 40 static pages. Shared First Load JS: 103 kB. `/` First Load JS: 120 kB.

---

## Notes

- Upload endpoint writes to **Vercel Blob** (not `public/uploads`). `public/uploads` is read-only on Vercel; the previous `fs.writeFile` pipeline failed in production.
- Server uploads through Vercel Blob cap at **4.5 MB per file**. The route allows 5 MB; WebP conversion keeps JPG/PNG/WebP well under the cap. Large GIFs could hit it.
- **Prisma 6.x** — pinned in `package.json` to avoid known packaging regressions in later major versions. **Do not run `npm audit fix --force`**; it will attempt a Prisma major upgrade.
- Migrations to Turso use `npx prisma migrate diff` + the Turso CLI, since Turso does not support `prisma migrate dev` directly.
- `report-*.json` and `lighthouse-report*.json` are gitignored — Lighthouse artifacts do not belong in the repo.

---

## Brand identity (v2, Direction A)

The v2 identity moves Code Craft from "dark and flashy" to calm, credible and conversion-focused: cobalt on cool white.

### Positioning

- **Who it's for:** small and local businesses that need a website or web app that works and that they can manage themselves.
- **What makes it different:** production-grade engineering (Lighthouse 98+ performance, tested, secure) with a self-service CMS, no lock-in to a proprietary agency system.
- **Personality:** precise, friendly, direct. An engineer who explains things in plain English.

### Voice rules

- Be specific. Say "launched in 3 weeks", not "fast turnaround".
- Lead with what the client gets, not what we believe.
- No jargon where a plain word works. Say "admin panel", not "headless CMS".
- Every page ends with one clear next step.

### Logo

A wordmark (`codecraft.` in Archivo 800, tight tracking, with a cobalt period) paired with a small `</>` icon (used *only* for favicons and avatars, never beside the wordmark).

```html
<!-- Small icon, 64×64. Use as favicon, avatar and social profile image. -->
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Code Craft">
  <rect width="64" height="64" rx="10" fill="#2B45FF"/>
  <path d="M24 22 14 32l10 10M40 22l10 10-10 10M35 20 29 44" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

| Rule | Spec |
| --- | --- |
| Clear space | Height of the period on all sides |
| Minimum size | 24 px icon, 96 px wordmark |
| Don't | Stretch, recolor the period, add shadows or effects |

### Color

A cool white ground with a single cobalt accent reserved for interactive elements and the wordmark period.

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#EEF0F4` | page ground |
| `--surface` | `#FFFFFF` | cards, panels, inputs |
| `--border` | `#D5D9E0` | decorative 1px rules |
| `--border-strong` | `#78828F` | inputs, checkboxes, control outlines |
| `--foreground` | `#0F1720` | text |
| `--muted` | `#55606F` | captions, secondary text |
| `--primary` | `#2B45FF` | links, active nav, buttons, focus rings |
| `--primary-tint` | `#E3E7FF` | selected backgrounds, active admin nav |

**Rules**

- Cobalt is used for links, buttons, active states, and focus rings. Never use cobalt as a fill behind body text.
- The hairline `--border` is decorative only; any control that must be perceivable (inputs, checkboxes) uses `--border-strong`.
- All text/background pairs pass WCAG AA (4.5:1 for body text, 3:1 for UI boundaries).

Tokens live in `:root` in `src/app/globals.css`; `tailwind.config.ts` maps them via `rgb(var(--token) / <alpha-value>)`.

### Typography

| Role | Font | Notes |
| --- | --- | --- |
| Everything | Archivo (400, 500, 800) | loaded via next/font, display: swap |
| Labels / code | System `ui-monospace` | small caps labels, tags, tech stack |

Body text is 16 px minimum, line height 1.6, line length 60–75 characters. Use one `<h1>` per page.

### Components

- **Primary button:** cobalt fill, white text, 4px radius, 48px tall, 15-16px weight 500. Hover `#1E34E0`, active `#182BC0`.
- **Secondary button:** transparent, 1px `--border-strong`, foreground text; hover border `--primary`.
- **Inputs:** `--surface` fill, 1px `--border-strong`, 4px radius, focus border `--primary` + 2px ring.
- **Cards:** `--surface`, 1px `--border`, 4px radius. No shadows.
- **Section rhythm:** 96px vertical padding on desktop, 64px on mobile; 1px `--border` rules between sections.

### Motion

CSS transitions of 300ms or less, native scroll-snap, and `prefers-reduced-motion` respected. No public page imports Framer Motion.

---

## Growth playbook

Applied from the WomensNet *Jumpstarting Your Marketing* guide. Items are goals, not claims about what is already live.

### 1. Site fundamentals (free, high impact)
- One target phrase per page, placed in the title tag, URL and H1.
- A unique meta description and descriptive image alt text on every page.
- Set up Google Search Console and Analytics, then submit `/sitemap.xml`.
- Move to a custom domain close to the business name.

### 2. Convert the traffic you have
- One primary CTA on every page: **Book a free consultation**.
- Keep forms short: name, email, one question.
- Earn trust: case studies for each shipped project and one short client testimonial.
- Test one change at a time (headline, CTA wording, CTA color), then keep what wins.

### 3. Offer a freebie
A one-page website launch checklist for small businesses, exchanged for an email address.

### 4. Local presence and networking
- Google Business Profile.
- Local Chamber of Commerce and Dallas–Fort Worth tech meetups.
- Referral partnerships with designers, photographers and printers.
- One social platform done well, linking back to the site.

### 5. Later
- **Publicity:** a launch press release to local business outlets.
- **Advertising:** hold until revenue is steady; it is the most expensive channel.

---

## Design system (legacy v1, retired)

The previous identity used a charcoal ground (`#0B0F14`) with a chartreuse accent (`#A3E635`) and Outfit / Geist Sans. It is replaced by the v2 tokens above.

---

Built by Serene Sheikhalard.
