# Code Craft

**A production-grade digital agency website with a full admin CMS.**

**Live:** [codeeecrafttt.vercel.app](https://codeeecrafttt.vercel.app)

Next.js 15 · React 19 · TypeScript · Prisma · Turso · NextAuth.js · Tailwind · Vitest · Vercel

---

## Lighthouse

Measured on PageSpeed Insights (Lighthouse 13.5.0).

| | Mobile | Desktop |
|---|---|---|
| **Performance** | **98** | **99** |
| **Accessibility** | **97** | 93 |
| **Best Practices** | **100** | **100** |
| **SEO** | **100** | **100** |

Mobile LCP **2.4s** · TBT **30ms** · CLS **0**. Reduced mobile LCP from 5.3s to 2.4s by converting 20+ PNGs to WebP (avg 78% smaller) and adding `priority` to the first above-the-fold image.

---
## By the numbers

| | |
|---|---|
| API route handlers | **56** (20 GET · 15 POST · 11 PUT · 10 DELETE) |
| Database models | **12** Prisma models mapped to **12** Turso tables |
| Pages | **36** |
| React components | **30** |
| TypeScript files | **103** |
| Direct dependencies | **16** |
| Static pages per build | **39** |
| Shared First Load JS | **103 kB** |
| Vitest tests | **8** |
| Production build | **~25s** |

---

## What it does

Agency marketing site with a fully self-service admin CMS. Editors log in at `/admin/login` and manage:

- **Services and add-ons** — CRUD with feature lists
- **Projects** — case studies with image galleries, live links, tech stack
- **Testimonials** — client quotes with author/role
- **Navigation and footer links** — reorderable
- **Legal and custom pages** — dynamic `/legal/[slug]` and `/p/[slug]` routing
- **Homepage sections** — reorderable, individually enabled/disabled
- **Site settings** — logo, contact info, social links, theme

The public site renders sections dynamically from the database — adding a "Pricing" section in the admin panel makes it appear on the homepage without a redeploy.

---
## Technical highlights

- **Full-stack TypeScript** — type-safe contracts between Prisma schema, API handlers, and React components
- **Server Components with client islands** — Next.js 15 App Router; only interactive components hydrate
- **JWT session auth** — NextAuth credentials provider with bcrypt; `/admin/*` protected at the middleware layer
- **Image pipeline** — server-side WebP conversion via `sharp` on upload; responsive `next/image` with `sizes` and `priority` on the LCP image
- **Security headers** — HSTS, CSP, X-Frame-Options via `next.config.js`
- **Rate limiting** — 10 uploads / 10 min / IP, 3 contact submissions / 10 min / IP
- **Automated tests** — 8 Vitest route tests against a real Prisma client

---

## Architecture

~~~text
src/
  app/                    Next.js App Router
    (public)/             Homepage, projects, legal, custom pages
    admin/                Login + dashboard CRUD
    api/                  56 route handlers
  components/             30 React components
    sections/             Homepage section renderers
    admin/                CMS UI
  lib/                    auth, prisma, image helpers
  middleware.ts           Route protection

prisma/
  schema.prisma           12 models
  seed.ts                 Demo content
~~~

**Data flow:** React pages fetch `/api/*`, route handlers use Prisma, then Turso (SQLite at the edge). Admin mutations require a valid NextAuth session; middleware redirects unauthenticated requests to `/admin/login` before they reach any protected handler.

**Deployment:** Vercel (edge functions + static pages) · Turso (libSQL) · Resend (transactional email).

---
## Tech stack

| Layer | Tools |
|---|---|
| **Language** | TypeScript |
| **Framework** | Next.js 15 (App Router), React 19 |
| **Styling** | Tailwind CSS, Framer Motion, Lucide React |
| **Database** | SQLite via Prisma 6.15, hosted on Turso (libSQL) |
| **Auth** | NextAuth.js (Credentials + bcrypt) |
| **Email** | Resend |
| **Image processing** | sharp (WebP conversion on upload) |
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

Fill `.env` with `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `RESEND_API_KEY`.

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

Generates **39 static pages**. Shared First Load JS: **103 kB**.

---
## Notes

- **Prisma pinned to 6.15.0** to avoid a known packaging regression in later releases.
- **Upload endpoint writes to `public/uploads`** — for persistent storage in production, swap to S3/R2/UploadThing.
- **Migrations to Turso** use `npx prisma migrate diff` + the Turso CLI, since Turso does not support `prisma migrate dev` directly.
- **`report-*.json` and `lighthouse-report*.json` are gitignored** — Lighthouse artifacts do not belong in the repo.

---

*Built by [Serene Sheikhalard](https://github.com/serenesheikh23).*
