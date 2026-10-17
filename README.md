# Code Craft

A Next.js 14 digital-agency website with a built-in admin CMS for managing services, projects, testimonials, legal pages, and site settings.

## Key features

- Admin panel protected by NextAuth credentials authentication
- CRUD management for services, add-ons, projects, testimonials, nav links, footer links, legal pages, custom pages, and site settings
- Dynamic homepage sections driven by a `HomepageSection` model
- Projects index and per-project detail pages at `/projects` and `/projects/[slug]`
- Legal and custom page routing at `/legal/[slug]` and `/p/[slug]`
- Contact form with email delivery via Resend
- File upload endpoint writing to `public/uploads`
- Dark theme with Framer Motion animations and Tailwind CSS
- Route-level protection of `/admin/*` via middleware

## Tech stack

- **Language:** TypeScript
- **Framework:** Next.js 14 (App Router)
- **UI:** React, Tailwind CSS, Framer Motion, Lucide React
- **Database:** SQLite via Prisma ORM
- **Auth:** NextAuth.js (Credentials provider)
- **Email:** Resend
- **Testing:** Vitest
- **Deployment:** Vercel

## Architecture overview

- `src/app/` — App Router pages and `/api/*` route handlers (27 route files, 56 exported HTTP handlers)
- `src/components/` — section components in `sections/` and admin UI in `admin/`
- `src/lib/` — `auth.ts` (NextAuth configuration), `prisma.ts` (Prisma client singleton), `utils.ts`
- `prisma/schema.prisma` — 12 models; `prisma/seed.ts` seeds demo content
- `src/middleware.ts` — protects `/admin/*` and redirects unauthenticated users to `/admin/login`

**Data flow:** React pages call `/api/*` route handlers, which use Prisma to read and write SQLite. Admin mutations require a valid NextAuth session. Middleware enforces the redirect before a request reaches any admin page or handler.

**Roles:** A single authenticated admin role. The `AdminUser` model backs the credentials provider. There is no public user account system.

## Getting started

### Prerequisites

Node.js 18 or newer, and npm.

### Installation

Clone the repository and install dependencies with npm. Copy `.env.example` to `.env` and fill in the values listed below.

### Environment variables

Defined in `.env.example`:

- `DATABASE_URL` — SQLite connection string
- `NEXTAUTH_SECRET` — secret used by NextAuth to sign sessions
- `NEXTAUTH_URL` — base URL of the running app
- `RESEND_API_KEY` — API key used by the contact form

### Database setup

Apply the Prisma migration to create the SQLite schema, then run the seed script to populate demo content. The seed covers services, add-ons, projects, testimonials, nav links, footer links, legal pages, custom pages, and homepage sections.

### Running locally

Start the development server using the `dev` script in `package.json`. The site is served at `http://localhost:3000` and the admin panel at `/admin/login`. See `package.json` for the full list of scripts.

### Tests

API route tests use Vitest. They import the route handlers directly and exercise the read endpoints for services and projects against the configured SQLite database. Run with `npm test`.

## Deployment

The project is configured for Vercel. Deployment requires setting the environment variables above in the Vercel dashboard and running Prisma migrations against the production database.

The upload endpoint writes to `public/uploads`, which is not persistent on Vercel's filesystem. Uploads therefore work in local development only unless the storage layer is replaced with object storage.