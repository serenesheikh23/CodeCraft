# Code Craft — public site redesign

Status: **merged to `main` and deployed to production.** Branch `redesign` was merged via `--no-ff`; production runs from `main`.

Live: [codeeecrafttt.vercel.app](https://codeeecrafttt.vercel.app)

---

## Identity

**Deep charcoal ground with a single chartreuse signal.**

- Not the personal portfolio's cream / serif / vermilion.
- No gradients, glow, glassmorphism, blobs, emoji, or stock illustration.
- Chartreuse `#A3E635` is used only for interactive state, active nav, section markers, focus rings, the CTA, and the hero's last line. Never as a background fill behind body text.
- The deliberate risk: **oversized Outfit headlines against a near-black ground with hairline rules, no cards floating in shadow.** Reads like a studio deck, not a SaaS template.

## Palette (measured)

| Token | Value | Contrast vs ground | Notes |
|---|---|---|---|
| `--background` | `#0B0F14` | — | charcoal, not pure black |
| `--foreground` | `#F0F4F8` | **17.8:1** | body + headlines |
| `--muted` | `#8B95A8` | **6.5:1** | captions, secondary text |
| `--accent` | `#A3E635` | **13.0:1** | links, active state |
| `--accent-foreground` | `#000000` on accent | **13.9:1** | CTA text |
| `--card` | `#141A26` | 1.1:1 vs ground | visible surface |
| `--border` | `#1E242F` | 1.26:1 | structural rules only |

WCAG AA on every text pair. Accent never sits behind body text.

## Typography

- **Display:** Outfit (variable), `next/font`, `display: swap`
- **Text:** Geist Sans (variable), `next/font`, `display: swap`
- **Mono:** system stack (`ui-monospace`) for labels and technical figures. No extra request.
- **Instrument Serif removed** — was loaded but never rendered. One fewer font request.

`font-outfit` → Outfit, `font-body` → Geist, `font-display` → Outfit (legacy alias kept working).

## What shipped

### Design system
- `tailwind.config.ts` fully rewritten. The previous config still mapped `accent`/`lime` to cyan and `background` to navy — the charcoal identity in `globals.css` was never rendering because the config didn't read the CSS variables. Now every color resolves from `rgb(var(--token) / <alpha-value>)`.
- `src/app/globals.css`: `--background` from pure black → `#0B0F14`; `--muted` raised to AA; `--card` lightened for surface visibility; reduced-motion guard kept.
- **Sharp corners everywhere** (`rounded-none` on cards, buttons, inputs, panels) except `rounded-full` on dots and avatars. Editorial, not pill.

### Layout
- `Navbar.tsx`: compact fixed bar, full-screen mobile sheet (`role="dialog"`, `aria-modal`, Escape to close, body scroll lock), sticky bottom CTA on mobile that hides on scroll-down, `env(safe-area-inset-bottom)` respected. CMS nav links from `/api/nav-links` with fallback. Logo is the chartreuse hexagon.
- `Footer.tsx`: CMS footer links, contact icons, "Built by Serene Sheikhalard" credit preserved. Same chartreuse hexagon.
- `SectionProgress.tsx` (new): 2px accent progress bar, `requestAnimationFrame`-throttled, `aria-hidden`.
- `src/app/not-found.tsx` (new): custom 404 — "Page off the grid." — with back-to-home and see-the-work CTAs.

### Homepage
The hero is now a real moment: `font-outfit`, `text-[clamp(3rem,14vw,11rem)]`, `leading-[0.85]`, last line in chartreuse. Off-center: tagline left, CTAs right.

Removed from the homepage:
- `QuoteEstimator` (pricing calculator mid-scroll) — file deleted
- `StackDiagram` (generic "Your Site / Fast Delivery / The Brain / Secure Storage") — file deleted

Added to the homepage:
- Section order is CMS-driven. `projects` was moved above `services` in `/admin/dashboard/sections`.

### Services
Numbered rows, not cards. Three show on the homepage, "See all 8 services →" links to `/services`. Tap-to-expand with `aria-expanded`, `aria-controls`, `hidden` attribute. Chevron rotates 90° when open (`motion-reduce` guard). No price or CTA visible until expanded.

### Projects
- Editorial rows: number, image (16:10), title, description, View live + Read case study
- Featured first, ordered by `order`
- Empty state returns `null` (no "Add first project" prompt to public visitors)
- Image uses `next/image` with `fill` + `sizes`, `unoptimized` for external URLs
- `/projects` index page added — every active project, featured first
- Project detail page: tech stack from CMS, native scroll-snap gallery with arrows, dots, keyboard Left/Right

### Image upload + crop (both hero and slideshow)
- **Upload** now uses `@vercel/blob` (`put()`) instead of `fs.writeFile` into `public/uploads` — that directory is read-only on Vercel, which is why every upload was failing in production.
- **Crop:** `src/lib/crop.ts` — parses/serializes `{url, zoom, x, y}`. Backward compatible: plain URLs render at 1× center.
- **`ImageUpload.tsx`:** 16:10 preview frame with drag-to-pan and 1×–3× zoom slider. What you see is exactly what the site renders.
- **`MultiImageUpload.tsx`:** each slideshow slide is its own crop row — 16:10 thumbnail, drag to pan, slider to zoom, Reset, Remove.
- Crop is stored **inside** the existing `imageUrl` / `images` text fields as JSON. No Prisma schema change, no API route change (except the `techStack` guard below).
- Admin project list thumbnail parses crop so JSON entries don't break the `<img>`.

### Legal, custom, services pages
- `/legal/[slug]`: 68ch measure, 1.75 line-height, last-updated line, editorial typesetting
- `/p/[slug]`: same typesetting; renders CMS sections if the page has any
- `/services`: full list of 8 services, all expanded-able
- `/projects`: index of all active projects

### Metadata + SEO
- Root `metadataBase`, `title.template`, OG, Twitter, canonical
- Homepage `generateMetadata` reads `siteSettings.tagline`
- Organization JSON-LD on `/` sourced from `siteSettings` (`name`, `url`, `description`, `email`, `sameAs` filtered for empty)
- `opengraph-image.tsx`: 1200×630 charcoal card with chartreuse "Products out."
- `robots.txt` disallows `/admin/` and `/api/`
- `sitemap.xml` includes `/`, `/projects/*`, `/legal/*`, `/p/*`
- Favicon: `public/logo-mark.svg` (chartreuse hexagon)

### Logo
The old cyan hexagon was recolored to chartreuse (`public/logo-mark.svg`) and now appears in navbar, footer, **admin sidebar**, and **admin login** — no more cyan on dark.

### Accessibility
- Skip link (`Skip to content`) — first tab press
- `aria-expanded` / `aria-controls` on every expandable
- Focus-visible rings on all interactive elements
- 44px minimum touch targets on mobile
- `prefers-reduced-motion` guards on every transition
- Semantic landmarks: `<header>`, `<nav aria-label>`, `<main id="main-content">`, `<footer>`
- WCAG AA on all text pairs (measured above)

### Interactions

| Interaction | File | Touch | Reduced motion |
|---|---|---|---|
| Services expand | `Services.tsx` | Tap, `aria-expanded`, `aria-controls`, 44px button, chevron rotates | `hidden` attribute; transition disabled |
| Testimonials swipe | `Testimonials.tsx` | Native scroll-snap, counter, prev/next | Scroll only |
| Project gallery | `ProjectSlideshow.tsx` | Native scroll-snap, arrows, dots, keyboard Left/Right | Scroll only |
| Contact form | `Contact.tsx` | `aria-live` status, graceful rate-limit message | No animation |
| Section progress | `SectionProgress.tsx` | Non-interactive, `pointer-events: none` | N/A |
| Mobile menu | `Navbar.tsx` | Full-screen sheet, Escape, focusable close, body lock | No slide animation |
| Hero crop | `ImageUpload.tsx` | Pointer drag + slider | N/A (admin) |
| Slide crop | `MultiImageUpload.tsx` | Pointer drag + slider per slide | N/A (admin) |

No autoplay anywhere. No carousel library. No custom cursors, parallax, WebGL, or page wipes.

## Build numbers

| | Before | After |
|---|---|---|
| Routes | 39 | **41** (`/services`, `/projects`, `/not-found` added; `/opengraph-image` added; 5 dead files removed but routes unaffected) |
| Shared First Load JS | 103 kB | **103 kB** (unchanged) |
| `/` First Load JS | 103 kB → 156 kB (first pass) → **118 kB** (after removing StackDiagram, QuoteEstimator, server-izing 10 renderers) | 118 kB |
| `/projects` | — | 114 kB |
| `/services` | — | 115 kB |
| `/projects/[slug]` | — | 115 kB |

`framer-motion` remains a dependency only because the admin project create/edit forms import it. **No public page imports framer-motion.**

## Safety-rule deviations (documented, per prompt instruction)

The prompt said: don't modify the upload pipeline, don't upgrade dependencies unnecessarily, don't break the API routes.

| Rule | What happened | Why |
|---|---|---|
| "Do not modify the upload pipeline" | `src/app/api/upload/route.ts` rewritten: `fs.writeFile` → `put()` from `@vercel/blob` | `public/uploads` is read-only on Vercel. Uploads were already broken in production before the redesign; the pipeline had to change to work at all. |
| "Do not upgrade dependencies" | Added `@vercel/blob` | Required for the above. No existing dependency was upgraded. Prisma stays pinned at 6.15.0. |
| "Do not modify API route handlers" | `src/app/api/projects/route.ts` POST: `techStack.split(",")` → `(techStack ?? "").split(",")` | The create form never sends `techStack`, so `undefined.split()` threw and every project create failed with "Failed to create project". One-line defensive guard. Behavior for the working path is identical. |

The admin UI behavior, Prisma schema, migrations, NextAuth, `middleware.ts`, security headers, CSP, and rate limiting were **not** touched.

## What I could not verify

- **Lighthouse not run.** The README's 98/97/100/100 are the **previous** build's scores and have not been re-measured against this one. 118 kB First Load on `/` is the main risk to mobile Performance.
- **Visual review of the deployed site.** Everything was verified by build, type, and lint. I have never seen the rendered page.
- **Admin panel not exercised end-to-end by me.** You have been creating projects; I have been fixing the routes. Full create → edit → crop → save has not been through a complete pass in a single session.
- **Reduced-motion** verified by code inspection, not by toggling the OS setting.
- **Contact rate limit** message path written but not triggered.

## Known limitations

- **No `theme` setting in `SiteSettings`.** The site is dark-only. All palette values live in `:root` in `globals.css`, so a future `theme` field can swap them by toggling a class on `<html>` — no component changes.
- **`phone1` / `phone2` / `whatsapp1` / `whatsapp2`** on `SiteSettings` default to Syrian numbers. The redesigned contact block uses email only; the numbers are in the schema but not displayed.
- **Vercel Blob server uploads cap at 4.5 MB** per file. The route allows 5 MB. WebP conversion keeps images well under this in practice; a large GIF could hit the cap.
- **`npm audit`** reports 13 vulnerabilities (8 high) in the dependency tree after adding `@vercel/blob`. These are almost certainly pre-existing in Next.js / Prisma. **Do not run `npm audit fix --force`** — it will upgrade Prisma past 6.15.0 and break the pinned version.

## Deleted files

- `src/components/Hero.tsx` — dead since before the redesign
- `src/components/sections/BentoGrid.tsx` — dead
- `src/components/sections/MetricsDashboard.tsx` — dead
- `src/components/sections/StackDiagram.tsx` — removed from homepage, then deleted
- `src/components/sections/QuoteEstimator.tsx` — removed from homepage, then deleted

806 lines removed.

## Placeholder / demo content to replace

- **Homepage hero copy** — "Ideas in. Products out." Kept from seed. Verify it's the line you want.
- **Testimonials** — names, companies, quotes are seed data. Replace with real client quotes before publishing.
- **Pricing** — plans and prices are seed data. Not on the homepage anymore, but still on `/services` if you enable it there. Confirm before publishing.
- **Services** — 8 service names, descriptions, and feature lists are seed data.
- **Projects** — production Turso still has the three stock placeholder projects (`saas-analytics-dashboard`, `ecommerce-fashion-store`, `mobile-task-management-app`). They are active + featured in the local SQLite. **Check the production admin and set them inactive.** The live site earlier showed only 3 real projects, so production may already have them off.

## Image upload guide for you

| Where | Aspect | Recommended upload | Where it appears |
|---|---|---|---|
| Hero image | 16:10 | **1600×1000** | Homepage card + case study header |
| Slideshow slides | 16:10 | **1600×1000** each | Case study page gallery |

After upload, **drag and zoom in the admin** to pick the frame. What you see in the admin preview is exactly what renders on the site.

## Deploy process

Already deployed. `main` is production. Future changes:

```bash
git checkout main
git pull
# make changes
npm run build
git add -A
git commit -m "..."
git push origin main