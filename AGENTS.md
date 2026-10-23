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
