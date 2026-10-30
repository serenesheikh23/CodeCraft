# Code Craft — public site redesign

Branch: `redesign`. `main` untouched, nothing merged, nothing deployed to production.

---

## Identity

**Deep charcoal ground with a single chartreuse signal.**

- Not the personal portfolio's cream / serif / vermilion.
- No gradients, glow, glassmorphism, blobs, emoji, or stock illustration.
- Chartreuse `#A3E635` is used only for interactive state, active nav, section markers, focus rings, and the CTA. Never as a background fill behind text.
- The one deliberate risk: **oversized Outfit headlines set against a near-black ground with hairline rules**, no cards floating in shadow. Reads like a studio deck, not a SaaS template.

## Palette (measured)

| Token | Value | Contrast vs ground | Notes |
|---|---|---|---|
| `--background` | `#0B0F14` | — | charcoal, not pure black |
| `--foreground` | `#F0F4F8` | **17.8:1** | body + headlines |
| `--muted` | `#8B95A8` | **6.5:1** | captions, secondary |
| `--accent` | `#A3E635` | **13.0:1** | links, active state |
| `--accent-foreground` | `#000000` on accent | **13.9:1** | CTA text |
| `--card` | `#141A26` | 1.1:1 vs ground | visible surface |
| `--border` | `#1E242F` | 1.26:1 | structural rules only |

WCAG AA pass on all text pairs. Accent never sits behind body text.

## Typography

- **Display:** Outfit (variable), `next/font`, `display: swap`
- **Text:** Geist Sans (variable), `next/font`, `display: swap`
- **Serif:** Instrument Serif, 400 — quote blocks and legal pages only
- **Mono:** system stack (`ui-monospace`) for labels and technical figures. No extra font request.

`font-outfit` → Outfit, `font-body` → Geist, `font-display` → Outfit (legacy alias kept working), `font-serif` → Instrument Serif.

## What changed

### Design system
- `tailwind.config.ts` fully rewritten. **The previous config still mapped `accent`/`lime` to cyan and `background` to navy — the charcoal identity in `globals.css` was never rendering.** Now every color resolves from the CSS custom properties, so the two halves match.
- `src/app/globals.css`: `--background` changed from pure black to `#0B0F14`; `--muted` raised to AA contrast; `--card` lightened so cards have a visible surface; reduced-motion guard kept.

### Layout
- `Navbar.tsx`: compact fixed bar, full-screen accessible sheet menu on mobile (`role="dialog"`, `aria-modal`, Escape to close, body scroll lock), sticky bottom CTA on mobile that hides on scroll-down, `env(safe-area-inset-bottom)` respected. CMS nav links fetched from `/api/nav-links` with a fallback.
- `Footer.tsx`: unchanged structurally — CMS footer links, contact icons, "Built by Serene Sheikhalard" credit preserved.
- `SectionProgress.tsx` (new): 2px accent progress bar, `requestAnimationFrame`-throttled, `aria-hidden`.

### Section renderers
All 12 types in `SectionRenderer.tsx` still map to a component; unknown types return `null`; empty arrays return `null`. Reordering and enable/disable in the admin still work with no code change.

Server-ized (no `"use client"`) to cut JS: `FeaturesSection`, `PricingSection`, `StatsSection`, `LogosSection`, `GallerySection`, `CustomTextSection`, `CtaSection`, `ProcessTimeline`, `Projects`, `StackDiagram`.

Interactive (client): `Navbar`, `Services`, `Testimonials`, `Contact`, `FaqSection`, `QuoteEstimator`, `SectionProgress`.

### Pages
- `/` — hero → marquee → sections from CMS → process timeline → stack diagram → quote estimator → contact and after.
- `/projects/[slug]` — new tokens, tech stack from CMS, native scroll-snap gallery.
- `/legal/[slug]` — real editorial typesetting, 68ch measure, 1.75 line-height, last-updated line.
- `/p/[slug]` — same typesetting, or renders CMS sections if the page has them.
- `/404` — untouched.
- Metadata: root metadata with `metadataBase`, OG, Twitter, canonical. Homepage `generateMetadata` reads `siteSettings.tagline`. Organization JSON-LD on `/` sourced from `siteSettings` (`name`, `url`, `email`, `sameAs` filtered for empty).
- `opengraph-image.tsx` (new): 1200×630 charcoal + chartreuse card.

### Interactions

| Interaction | File | Touch | Reduced motion |
|---|---|---|---|
| Services expand | `Services.tsx` | Tap, `aria-expanded`, `aria-controls`, 44px button | `hidden` attribute; no transition |
| Testimonials swipe | `Testimonials.tsx` | Native scroll-snap, counter, prev/next buttons | Scroll only |
| Project gallery | `ProjectSlideshow.tsx` | Native scroll-snap, arrows, dots, keyboard Left/Right | Scroll only |
| Contact form | `Contact.tsx` | Inline validation, `aria-live` status, graceful rate-limit message | No animation |
| Section progress | `SectionProgress.tsx` | Non-interactive, pointer-events none | N/A |
| Mobile menu | `Navbar.tsx` | Full-screen sheet, Escape, focusable close | No slide animation |

No autoplay anywhere. No carousel library. No custom cursors, parallax, WebGL, or page wipes.

## Build numbers

| | Before | After |
|---|---|---|
| Pages per build | 39 | **40** (OG image added) |
| Shared First Load JS | 103 kB | **103 kB** |
| `/` First Load JS | 103 kB | **156 kB** |

The 53 kB on `/` is the interactive set (Navbar, Services, Testimonials, Contact, Faq, QuoteEstimator, SectionProgress). `framer-motion` remains a dependency only because `BentoGrid.tsx` and `MetricsDashboard.tsx` still import it — both are **dead code, never imported by any page**. `StackDiagram` no longer uses it.

## What I could not verify

- **Lighthouse not run.** You asked me to skip it. The README's 98/97/100/100 numbers are the previous build's and have not been re-measured against this one. The 156 kB First Load on `/` is the main risk to the mobile Performance score.
- **Visual review of the deployed preview.** I have not seen the site render. All checks are build, type, and lint only.
- **Admin panel not exercised.** I did not log in, create, reorder, or disable a section. I only confirmed the public renderers still map every type and that `SectionRenderer` reads from the same Prisma models as before.
- **Reduced-motion verified by code inspection**, not by toggling the OS setting.
- **Contact rate limit** not exercised — the message path is written but not triggered.

## Limitations

- **No `theme` setting in the schema.** `SiteSettings` has no theme field, so the site is dark-only. All palette values live in `:root` in `globals.css`, so a future `theme` field can swap them by toggling a class on `<html>` — no component changes needed.
- **`Phone`/`WhatsApp` fields** on `SiteSettings` default to Syrian numbers. The redesigned contact block uses email only; the numbers are in the schema but not displayed.
- **Dead components** left in place per "do not delete": `src/components/Hero.tsx`, `src/components/sections/BentoGrid.tsx`, `src/components/sections/MetricsDashboard.tsx`. All contain old cyan/blue classes and framer-motion. Safe to delete when you're ready — nothing imports them.

## Placeholder / demo content to replace

- Seed copy "Ideas in. Products out." — kept, but verify it's what you want on the homepage hero.
- Testimonial names, company names, quotes — seed data. Replace with real client quotes.
- Pricing plans and prices — seed data. Confirm before publishing.
- Service names, descriptions, feature lists — seed data.
- Project screenshots — whatever is in the DB.

## Preview, merge, deploy

Preview on your phone:
1. `git push` (already done for `redesign`)
2. Vercel → Deployments → remove the Production filter → open the `redesign` preview.
3. Test on a 360px phone: mobile menu, sticky CTA, services expand, testimonials swipe, project gallery swipe, contact form.

Merge to main (only after the preview looks right and you've run Lighthouse):
1. `git checkout main && git pull`
2. `git merge --no-ff redesign`
3. `git push origin main`
4. Vercel production redeploys from `main`.

Never force-push. Never merge before the preview is green.
