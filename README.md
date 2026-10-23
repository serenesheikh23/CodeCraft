# Code Craft

A Next.js digital-agency website with a built-in admin CMS for managing services, projects, testimonials, legal pages, and site settings.

## Live demo

[https://codeeecrafttt.vercel.app](https://codeeecrafttt.vercel.app)

## Key features

- Admin panel protected by NextAuth credentials authentication
- CRUD management for services, add-ons, projects, testimonials, nav links, footer links, legal pages, custom pages, and site settings
- Dynamic homepage sections driven by a `HomepageSection` model
- Projects index and per-project detail pages at `/projects` and `/projects/[slug]`
- Legal and custom page routing at `/legal/[slug]` and `/p/[slug]`
- Contact form with email delivery via Resend (rate-limited to 3 requests per 10 min)
- Secure file upload endpoint with MIME-type validation (rate-limited to 10 requests per 10 min)
- Dynamic `sitemap.xml` and `robots.txt` generation
- Dark theme with Tailwind CSS and optimized Framer Motion animations
- Strict security headers (HSTS, CSP, X-Frame-Options, etc.) via Next.js config
- Route-level protection of `/admin/*` via middleware

## Tech stack

- **Language:** TypeScript
- **Framework:** Next.js 15 (App Router), React 19
- **UI:** Tailwind CSS, Framer Motion, Lucide React
- **Database:** SQLite via Prisma ORM (v6.15.0), hosted on Turso (libSQL)
- **Auth:** NextAuth.js (Credentials provider)
- **Email:** Resend
- **Testing:** Vitest
- **Deployment:** Vercel

## Architecture overview

- `src/app/` — App Router pages and `/api/*` route handlers
- `src/components/` — section components in `sections/` and admin UI in `admin/`
- `src/lib/` — `auth.ts` (NextAuth configuration), `prisma.ts` (Prisma client singleton with Turso adapter), `utils.ts`
- `prisma/schema.prisma` — 12 models; `prisma/seed.ts` seeds demo content
- `src/middleware.ts` — protects `/admin/*` and redirects unauthenticated users to `/admin/login`

**Data flow:** React pages call `/api/*` route handlers, which use Prisma to read and write SQLite. Admin mutations require a valid NextAuth session. Middleware enforces the redirect before a request reaches any admin page or handler.

**Roles:** A single authenticated admin role. The `AdminUser` model backs the credentials provider. There is no public user account system.

## Getting started

### Prerequisites

Node.js 18 or newer, and npm.

### Installation

Clone the repository and install dependencies with npm. Copy `.env.example` to `.env` and fill in the values listed below.

*Note: Prisma is pinned to `v6.15.0` in `package.json` to avoid recent upstream packaging bugs in newer versions.*

### Environment variables

Defined in `.env.example`:

- `TURSO_DATABASE_URL` — libSQL connection string (or `DATABASE_URL` for local file)
- `TURSO_AUTH_TOKEN` — Turso authentication token
- `NEXTAUTH_SECRET` — secret used by NextAuth to sign sessions
- `NEXTAUTH_URL` — base URL of the running app
- `RESEND_API_KEY` — API key used by the contact form

### Database setup

For local development, apply the Prisma migration to create the SQLite schema, then run the seed script to populate demo content. The seed covers services, add-ons, projects, testimonials, nav links, footer links, legal pages, custom pages, and homepage sections.

For production (Turso), use `npx prisma migrate diff` to generate the SQL and apply it via the Turso CLI, then run the seed script with the Turso environment variables set.

### Running locally

Start the development server using the `dev` script in `package.json`. The site is served at `http://localhost:3000` and the admin panel at `/admin/login`. See `package.json` for the full list of scripts.

### Tests

API route tests use Vitest. They import the route handlers directly and exercise the read endpoints for services and projects against the configured SQLite database. Run with `npm test`.

## Deployment (Vercel)

The project is deployed on Vercel. Ensure the environment variables listed above are set in the Vercel Dashboard under **Settings > Environment Variables**.

**Important Build Notes:**
- **Prisma Generation:** Vercel runs `npm install` in production mode. The `build` script includes `prisma generate` to ensure the Prisma client is compiled during deployment.
- **Workspace Root:** `next.config.js` explicitly sets `outputFileTracingRoot` to prevent Vercel from accidentally treating parent directories (like a stray lockfile in the user's home directory) as the workspace root.
- **Prisma Engines:** If the Vercel build fails with an `ECONNRESET` while downloading Prisma engines, add the following environment variable to bypass the default Prisma CDN:
  `PRISMA_ENGINES_MIRROR=https://registry.npmmirror.com/-/binary/prisma`

*Note: The upload endpoint writes to `public/uploads`, which is not persistent on serverless platforms. Uploads work in local development only unless the storage layer is replaced with object storage (e.g., AWS S3, Cloudflare R2).*