# Code Craft

**A production-grade digital agency website with a full admin CMS.**

**Live:** [codeeecrafttt.vercel.app](https://codeeecrafttt.vercel.app)

Next.js 15 · React 19 · TypeScript · Prisma · Turso · NextAuth.js · Tailwind · Vitest · Vercel · Vercel Blob

---

## Lighthouse

**Measured before the current redesign. Not re-measured against the current `main`.** Treat these as the pre-redesign baseline until a fresh run is done.

| | Mobile | Desktop |
|---|---|---|
| **Performance** | **98** | **99** |
| **Accessibility** | **97** | 93 |
| **Best Practices** | **100** | **100** |
| **SEO** | **100** | **100** |

Pre-redesign: mobile LCP **2.4s** · TBT **30ms** · CLS **0**. That LCP was achieved by converting 20+ PNGs to WebP (avg 78% smaller) and adding `priority` to the first above-the-fold image.

The redesign changed the public surface substantially (new palette, new section renderers, new fonts, `/services` and `/projects` routes, drag-to-crop uploader). Re-run Lighthouse before quoting these numbers anywhere.

---
## By the numbers

| | |
|---|---|
| API route handlers | **56** (20 GET · 15 POST · 11 PUT · 10 DELETE) |
| Database models | **12** Prisma models mapped to **12** Turso tables |
| Public routes | **9** (`/`, `/projects`, `/projects/[slug]`, `/services`, `/legal/[slug]`, `/p/[slug]`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`) |
| Static pages per build | **40** |
| Shared First Load JS | **103 kB** |
| `/` First Load JS | **118 kB** |
| Vitest tests | **8** |
| Production build | **~14s** |

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
- **Image pipeline** — server-side WebP conversion via `sharp`, then `put()` to **Vercel Blob**. Responsive `next/image` with `sizes` and `priority` on the LCP image.
- **Crop on upload** — hero image and each slideshow slide support drag-to-pan and 1×–3× zoom in the admin. Crop is encoded inside the existing `imageUrl` / `images` text fields as JSON; no schema change, backward compatible with plain URLs.
- **Security headers** — HSTS, CSP, X-Frame-Options via `next.config.js`
- **Rate limiting** — 10 uploads / 10 min / IP, 3 contact submissions / 10 min / IP
- **Automated tests** — 8 Vitest route tests against a real Prisma client

---

## Architecture

~~~text
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
~~~

**Data flow:** React pages fetch `/api/*`, route handlers use Prisma, then Turso (SQLite at the edge). Admin mutations require a valid NextAuth session; middleware redirects unauthenticated requests to `/admin/login` before they reach any protected handler.

**Deployment:** Vercel (edge functions + static pages) · Turso (libSQL) · Vercel Blob (image storage) · Resend (transactional email).

---
## Tech stack

| Layer | Tools |
|---|---|
| **Language** | TypeScript |
| **Framework** | Next.js 15 (App Router), React 19 |
| **Styling** | Tailwind CSS, Lucide React |
| **Animation** | Framer Motion — **admin forms only**; no public page imports it |
| **Database** | SQLite via Prisma 6, hosted on Turso (libSQL) |
| **Auth** | NextAuth.js (Credentials + bcrypt) |
| **Email** | Resend |
| **Image processing** | sharp (WebP conversion on upload) + Vercel Blob (persistent storage) |
| **Testing** | Vitest |
| **Deploy** | Vercel |

---

## Run locally

Clone the repo, install, copy env, migrate, seed, run.

~~~bash
git clone https://github.com/serenesheikh23/CodeCraft
cd CodeCraft
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run dev
~~~

Fill `.env` with `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `RESEND_API_KEY`, **`BLOB_READ_WRITE_TOKEN`**.

`BLOB_READ_WRITE_TOKEN` is issued by Vercel when you create a Blob store and connect it to the project (**Storage → Create → Blob → Public access → enable "Add a read-write token env var"**). Without it, `/api/upload` returns 500.

Open **http://localhost:3000**. Admin panel at **`/admin/login`**.

### Test

~~~bash
npm test
~~~

8 Vitest tests covering projects, services, testimonials, sections, settings, nav links, footer links, and legal pages.

### Build

~~~bash
npm run build
~~~

Generates **40 static pages**. Shared First Load JS: **103 kB**. `/` First Load JS: **118 kB**.

---
## Notes

- **Upload endpoint writes to Vercel Blob** (not `public/uploads`). `public/uploads` is read-only on Vercel; the previous `fs.writeFile` pipeline failed in production.
- **Server uploads through Vercel Blob cap at 4.5 MB** per file. The route allows 5 MB; WebP conversion keeps JPG/PNG/WebP well under the cap. Large GIFs could hit it.
- **Prisma 6.x** — pinned in `package.json` to avoid known packaging regressions in later major versions. Do not run `npm audit fix --force`; it will attempt a Prisma major upgrade.
- **Migrations to Turso** use `npx prisma migrate diff` + the Turso CLI, since Turso does not support `prisma migrate dev` directly.
- **`report-*.json` and `lighthouse-report*.json` are gitignored** — Lighthouse artifacts do not belong in the repo.

---
## Design system

The public site uses a charcoal ground with a single chartreuse signal. Tokens live in `:root` in `src/app/globals.css`; `tailwind.config.ts` maps them via `rgb(var(--token) / <alpha-value>)`.

| Token | Value | Notes |
|---|---|---|
| `--background` | `#0B0F14` | charcoal, not pure black |
| `--foreground` | `#F0F4F8` | body + headlines |
| `--muted` | `#8B95A8` | captions, secondary |
| `--accent` | `#A3E635` | interactive state, active nav, CTA |
| `--card` | `#141A26` | visible surface |
| `--border` | `#1E242F` | structural rules only |

Typography: **Outfit** for display, **Geist Sans** for body, system mono for labels. Loaded via `next/font` with `display: swap`.

No public page imports Framer Motion. Interactions use CSS transitions (≤300ms) plus native scroll-snap, and respect `prefers-reduced-motion`.

---

*Built by [Serene Sheikhalard](https://github.com/serenesheikh23).*