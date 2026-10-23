# Code Craft — agent rules

## Stack
Next.js 15 App Router, React 19, TypeScript, Tailwind, Framer Motion,
Prisma v6 (adapter-libsql, Turso), NextAuth credentials, Resend, Vitest.
Deployed on Pxxl from `main`. Baseline tag: `baseline-before-ai`.

## Hard rules
- ONE logical change per task. No drive-by refactors, no "while we're here."
- Do NOT touch: `src/lib/auth.ts`, `src/middleware.ts`, `prisma/schema.prisma`,
  `prisma/migrations/**`, anything under `src/app/admin/**` or `src/app/api/auth/**`.
- Do NOT run `prisma migrate`, `db push`, `db:seed`, or anything that writes to the DB.
- Do NOT delete files. Do NOT change `package.json` versions. Do NOT run
  `npm audit fix`, `npm update`, or `npm install <pkg>` unless I name the exact package.
- Do NOT commit unless I ask. Show me `git diff` first.
- Preserve existing behavior, copy, styling, and routing unless the task says otherwise.
- Prefer server components. Keep `use client` components small.
- Use `next/image`, `next/font`, and accessible markup for any UI change.

## After every code change
- `npx tsc --noEmit`
- `npm run build`
- `npm test`
- Report: files changed, commands run, pass/fail, anything you could not verify.

## If unsure
Stop and ask. Do not guess at auth, admin, env, DB, or deployment behavior.

## Environment notes
- Node 24 works. Prisma postinstall needs `PRISMA_ENGINES_MIRROR` (already in ~/.zshrc).
- `.npmrc` is gitignored — do not recreate it.
- `next.config.js` sets `outputFileTracingRoot` — do not remove.
- A stray `/Users/mac/package-lock.json` exists outside the repo — do not touch it.

## Aesthetic rules — do not look AI-generated

### Copy
- No em dashes (—). Use commas, periods, or parentheses.
- No words: seamlessly, effortlessly, elevate, unlock, harness, empower,
  supercharge, "in today's", "digital landscape", "cutting-edge", "revolutionize".
- No marquees of adjectives ("Fast. Clean. Modern. Scalable.").
- No generic headlines: "Built to last", "How it's built", "Building ideas into
  digital products", "Empowering X through Y".
- No "Available for work" pill badges. If availability must be shown, say it
  once, plainly, in the footer or contact section.
- No repeated CTA text 8× in a card grid. Vary the CTA per service, or use one
  shared CTA above the grid.
- No fake terminal windows, fake code editors, blinking cursors, or "zsh"
  mockups. If code must be shown, show real, running code from the repo.
- Prefer short, specific sentences over abstract ones. "We ship in 2 weeks,
  not 2 months" beats "We value speed".
- If a line could appear on any agency site, rewrite it.

### Visual
- No animated gradient blobs behind the hero.
- No glassmorphism, no bento-box layouts unless there is a real reason.
- Do not default to dark mode + neon accent. If a section is dark, it must
  contrast with a light section, not be the whole page.
- No uniform card grids with icon + title + description unless the content
  genuinely requires 4+ equal items.
- Typography: do not pair Inter with JetBrains Mono by default. Use the
  existing font stack from `next/font` unless I explicitly ask for a change.
- Any new UI element must pass this test: would a freelance designer in 2024
  have shipped this, or would they have rolled their eyes?

### Process
- Before writing user-facing copy, show me 3 variants and wait for approval.
- Do not change any visible copy as part of a technical task.
- If a task requires new copy, put it in a separate commit titled
  "copy: ..." so it can be reviewed independently.
