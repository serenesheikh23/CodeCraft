# Code Craft — Agent Rules

## Stack & Deployment
Next.js 15 App Router, React 19, TypeScript, Tailwind, Framer Motion, Prisma v6 (adapter-libsql, Turso), NextAuth, Resend, Vitest.
Deployed on **Vercel**. 

## Hard Rules
- ONE logical change per task. No drive-by refactors.
- Do NOT touch: `src/lib/auth.ts`, `src/middleware.ts`, `prisma/schema.prisma`, `prisma/migrations/**`, anything under `src/app/admin/**` or `src/app/api/auth/**`.
- Do NOT run `prisma migrate`, `db push`, `db:seed`, or anything that writes to the DB.
- Do NOT delete files. Do NOT change `package.json` versions or install new packages without asking.
- Preserve existing behavior, copy, styling, and routing unless the task says otherwise.

## Performance & LCP Rules (CRITICAL)
- **NEVER** use `initial={{ opacity: 0 }}` on above-the-fold content (like the Hero `<h1>` or main badge). This delays Largest Contentful Paint (LCP) until hydration finishes and tanks the performance score. 
- Above-the-fold content must render immediately in the Server-Side HTML (SSR).
- Prefer Server Components. Keep `"use client"` components as small and low in the tree as possible.
- Always use `next/image` with correct `sizes`, `width`, and `height` (or `fill`).
- *Local Environment Note:* Running `npm run build` locally may fail with a `prisma: command not found` error due to engine downloads. Use `npx tsc --noEmit` to check types, and rely on Vercel for the production build.

## Aesthetic Rules — Do Not Look AI-Generated
- **NO** glowing neon background blobs (`blur-3xl` with cyan/blue).
- **NO** fake terminal windows, fake code editors, typing animations, or "zsh" mockups.
- **NO** uniform bento-box grids where every card looks identical.
- **NO** generic agency copy (e.g., "Ideas in. Products out.", "Built to last", "How we think", "Fast. Clean. Modern.").
- **NO** scrolling marquees of adjectives.
- **NO** glassmorphism or default dark mode + neon accents.
- **YES** to editorial, asymmetric layouts.
- **YES** to massive, bold, tightly-tracked typography.
- **YES** to generous whitespace and sophisticated dark mode (warm charcoal, not pure black).
- **YES** to subtle, intentional motion (e.g., hover states) rather than fading in every paragraph.
- Any new UI element must pass this test: would a high-end freelance designer ship this, or would they roll their eyes?

## Workflow
- Before writing user-facing copy, show me 3 variants and wait for approval.
- Do not change any visible copy as part of a technical task. Put copy changes in a separate commit titled "copy: ...".
- After every code change, run `npx tsc --noEmit` and `npm test`. 
- If unsure, STOP and ask. Do not guess at auth, admin, env, DB, or deployment behavior.
---

## Session Rules — Presentation / Design Phases

These rules apply on top of the rules above during the `design/presentation-v1` branch and must not override the LCP and Aesthetic rules above.

### Hard boundaries — never touch or run
- `prisma/schema.prisma`, `prisma/seed.ts`, `prisma/migrations/**`, `prisma/dev.db.current-backup`
- Any file under `src/app/api/**` — you may READ to learn response shapes, never EDIT (including GET handlers)
- `src/lib/auth.ts`, `src/middleware.ts`
- `.env`, `.env.example`, `.env.*`
- Any `prisma migrate` / `dev` / `reset` / `deploy` / `db push` / `db seed` command

### Admin exception (scoped)
The rule above says do not touch `src/app/admin/**`. During this design branch, an explicit exception is allowed:
you MAY edit `src/app/admin/**` and `src/components/admin/**` for PRESENTATIONAL changes only —
loading skeletons, empty states, error display, focus/hover/disabled styles, spacing, typography, and color tokens.

You may NOT edit: any `fetch()` call, any `onSubmit`, any API call, any `useEffect`, any state management, any type definition, or `src/app/admin/layout.tsx` if it wires auth.

### Shared components
Components under `src/components/` are used by both the public site and admin. Restyle them freely, but do NOT change their props, exports, or required className behavior. After editing a shared component, grep for usages under `src/app/admin/` and confirm call sites still typecheck.

### Design tokens (decided — do not change)
- Display font: **Instrument Serif**
- Body font: **Geist Sans**
- Spacing scale: 4 8 12 16 24 32 48 64 96 128 only
- Border radius: 4, 8, 12, 16 only
- One accent color family, 3 stops. **No purple. No gradients.**

### Verification before reporting done
1. `npm run build` passes.
2. Report every file changed.
3. Confirm you did not touch any forbidden file.
