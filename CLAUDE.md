# CLAUDE.md

Guidance for Claude Code (and the designer) working in this repo.

## What this is

A playful personal website for **Amelia** at **amelialass.com**. It is currently a
placeholder "coming soon" page that exists to prove the Cloudflare + CI/CD wiring.
The real site (wishlists, birthday details, etc.) will be built on top of this
scaffold by a designer. **The placeholder identity in `globals.css` and `page.tsx`
is intentionally disposable — replace it freely.**

## Stack

Next.js 16 App Router + React 19 + Tailwind CSS v4, deployed to **Cloudflare
Workers** via `@opennextjs/cloudflare`. There are two builds: `npm run build`
(standard Next.js, for local dev) and `npm run build:worker` (OpenNext, for
deployment). Worker config is in `open-next.config.ts` and `wrangler.toml`.

> Heads-up: Next.js 16 has breaking changes vs. older versions. When unsure of an
> API, check `node_modules/next/dist/docs/` rather than relying on memory.

## Commands

```bash
npm run dev          # dev server on :3000
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run test         # Vitest unit tests (jsdom)
npm run build:worker # OpenNext Cloudflare build
npm run preview      # run the built Worker locally (workerd)
npm run deploy       # deploy to Cloudflare (CI does this on push to main)
```

Run the full local gate before pushing: `npm run lint && npm run typecheck && npm run test`.

## Conventions

- **Styling:** Tailwind v4 with design tokens defined in `src/app/globals.css`.
  Reference colors as `var(--color-*)` — don't hardcode hex in components.
- **Path alias:** `@/` → `src/` (see `tsconfig.json`).
- **Tests:** Vitest, co-located as `*.test.tsx`, jsdom environment.
- **Custom domains** in `wrangler.toml` are commented out until the amelialass.com
  DNS zone is Active (see README "Going live"). Until then deploys land on
  `*.workers.dev`.

## CI/CD

GitHub Actions: `quality.yml` (lint/typecheck/test on push+PR to main/preview),
`deploy.yml` (push to main → build:worker → deploy), `deploy-preview.yml` (push to
preview → preview env). Deploys authenticate via the `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` repo secrets.
