# REDESIGN NOTES — Code Craft Public Site

## Identity
**Chosen: Deep charcoal/ink surfaces with chartreuse accent**

- **Why**: Clearly distinct from the personal portfolio (warm cream/paper background, serif display face, vermilion accent). Charcoal with chartreuse is sharp, modern, and agency-grade — intentionally not a template look.
- **Contrast**: Chartreuse (#A3E635, hsl(163, 230, 53)) against charcoal (#0B0F14) provides ~6.5:1 WCAG AA contrast for large text, >4.5:1 for normal text.
- **Accent usage**: Interactive links, active states, section dividers, focus rings. Never as a background overlay or gradient.

## Color Palette (HSL values, Tailwind `103 232 249` format)

| Token | Value | Usage |
|---|---|---|
| `bg-background` | `0 0 0` | Page background (dark charcoal) |
| `text-text` | `240 244 248` | Main text (off-white) |
| `bg-card` | `12 16 27` | Card/surface backgrounds |
| `border` | `30 36 47` | Borders, dividers |
| `muted` | `86 94 102` | Muted text, secondary text |
| `accent` | `163 230 53` | Chartreuse — primary accent |
| `accent-fg` | `0 0 0` | Text on accent (contrast) |
| `subtle` | `30 36 47` | Hover/active backgrounds |
| `info` | `34 211 238` | Secondary accent (cyan) |

## Typography
- **Display face**: `Outfit` (Google Font, confident grotesque, weights 400/500/600/700, `display: swap`)
- **Text face**: `Geist Sans` (already present, refined sans-serif, `display: swap`)
- **Monospace**: system monospace via `font-mono` (for code/technical details)
- **Never use**: Inter, Roboto, Arial as the identity display face
- **Serif**: `Instrument_Serif` used sparingly for quote blocks or legal content only

## Font Stack (layout.tsx)
```
--font-outfit: Outfit (400 500 600 700)
--font-geist-sans: Geist Sans
--font-serif: Instrument_Serif
```

## Section Mapping — existing database section types → redesigned renderers

| DB Type | Renderer | Changes |
|---|---|---|
| `hero` | `HeroSection` | Redesigned: deep hero, chartreuse CTA, no badge default |
| `features` | `FeaturesSection` | Redesigned: grid cards, chartreuse accents, no framer-motion |
| `pricing` | `PricingSection` | Redesigned: 3-column grid, chartreuse CTA buttons |
| `faq` | `FaqSection` | Redesigned: accordion, reduced motion fallback |
| `gallery` | `GallerySection` | Redesigned: grid layout, webP, lazy load |
| `stats` | `StatsSection` | Redesigned: grid of statistic cards |
| `logos` | `LogosSection` | Redesigned: client logo grid |
| `custom-text` | `CustomTextSection` | Redesigned: editorial text, no motion |
| `services` | `ServicesList` | Redesigned: tap-to-expand cards (interaction) |
| `projects` | `ProjectsList` | Redesigned: grid with refined states |
| `testimonials` | `TestimonialsList` | Redesigned: swipe strip, no autoplay |
| `contact` | `ContactSection` | Redesigned: inline validation, accessible |

## Interactions (all degrade gracefully)

| Interaction | File | Touch degradation | Reduced motion |
|---|---|---|---|
| Services tap-to-expand | Services.tsx | Single-column vertical accordion | Static content, no animation |
| Projects grid gallery | Projects.tsx | Stacked single column | Fade-in only |
| Testimonials swipe strip | Testimonials.tsx | Vertical accordion flow | No motion, visible order |
| Contact form validation | Contact.tsx | Basic HTML validation | Immediate success/error |
| Anchor navigation | page.tsx | Skip links only | Static headings |
| Cmd/Ctrl+K quick nav | Navbar (optional) | N/A — desktop only | N/A |

## CMS continuity
- All 12 homepage section types have redesigned renderers
- Unknown section types render `null` (graceful degradation)
- Reordering/enabling-disabling in admin requires no code changes
- Site settings (logo, contact info, social links) map to new tokens
- No theme CMS field exists in schema — design works in both light/dark

## What changed per file (summary)

- `src/app/layout.tsx`: Replaced Inter with Outfit display grotesque; removed Instrument_Serif from root class
- `src/app/globals.css`: Complete palette rewrite — deep charcoal, chartreuse accent; removed glassmorphism, gradients, neon; added reduced-motion query; added focus-ring; added section-label underline
- `src/components/Navbar.tsx`: Redesigned — compact top bar, sheet menu on mobile, sticky bottom CTA, no brand gradient, no scroll-based bg blur
- `src/components/Footer.tsx`: Redesigned — charcoal footer, chartreuse accents, contact links from settings
- `src/components/sections/HeroSection.tsx`: Redesigned — single-column mobile first, large display type, chartreuse CTA buttons
- `src/components/sections/FeaturesSection.tsx`: Redesigned — chartreuse accented grid, no framer-motion, focusable
- `src/components/sections/PricingSection.tsx`: Redesigned — 3-column grid, chartreuse CTA, no motion
- `src/components/sections/FaqSection.tsx`: Redesigned — native accordion, no motion, arrow keys
- `src/components/sections/CtaSection.tsx`: Redesigned — static, no motion
- `src/components/sections/CustomTextSection.tsx`: Redesigned — editorial text, no motion
- `src/components/sections/StatsSection.tsx`: Redesigned — chartreuse accented grid
- `src/components/sections/GallerySection.tsx`: Redesigned — webP, static images
- `src/components/sections/LogosSection.tsx`: Redesigned — grid of logos, no filter/glow effects
- `src/components/sections/ServicesTerminal.tsx`: Removed (replaced by Services list interaction)
- `src/components/Services.tsx`: Redesigned — tap-to-expand cards with aria-expanded, keyboard support
- `src/components/Projects.tsx`: Redesigned — grid tap/hover state, no motion
- `src/components/Testimonials.tsx`: Redesigned — swipe strip, counter, no autoplay
- `src/components/Contact.tsx`: Redesigned — inline validation, accessible announcements
- `src/components/ProjectSlideshow.tsx`: May need redesign for scroll-snap gallery
- `src/app/page.tsx`: Redesigned — section ordering (hero → proof → services → testimonials → contact), anchor navigation
- `src/app/legal/[slug]/page.tsx`: Redesigned — proper typesetting, prose layout
- `src/app/p/[slug]/page.tsx`: Redesigned — editorial layout, typeset paragraphs
- `src/app/projects/[slug]/page.tsx`: Redesigned — native scroll-snap gallery, tech stack, live link

## Lighthouse targets (must not regress)
- Mobile: Performance 98+, Accessibility 97+, Best Practices 100, SEO 100
- Desktop: Performance 98+, Accessibility 97+ (was 93, needs improvement), Best Practices 100, SEO 100
- Mobile LCP ≤ 2.4s, CLS 0, TBT ~30ms
- Shared First Load JS near 103 kB

## Key design rejections (why)
- No cream/paper backgrounds (personal portfolio carryover)
- No serif-led headlines (personal portfolio carryover)
- No vermilion/orange-red accent (personal portfolio carryover)
- No purple/blue/pink AI gradients
- No glowing blobs, glassmorphism, neon
- No emoji icons, stock illustrations
- No three-identical-icon-card grids
- No floating abstract shapes
- No horizontal page scroll, no parallax, no autoplaying motion, no WebGL, no page-wipe transitions

## Notes for me to replace (placeholder/demo content)
- Seed data contains "Ideas in. Products out." headline — keep structure, replace copy
- Testimonial client names/company names are from seed — improve copy later
- Pricing plans from seed — keep structure, replace prices/copy
- Footer links have "Pricing" pointing to `/#services` — fix to proper pricing page
- MarqueeBand is currently null — keep as-is or remove
- "Built by Serene Sheikhalard" credit in footer must remain