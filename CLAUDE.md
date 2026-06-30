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
npm run test:e2e     # Playwright E2E (CI-only on this host — see note below)
npm run build:worker # OpenNext Cloudflare build
npm run preview      # run the built Worker locally (workerd on :8787)
npm run deploy       # deploy to Cloudflare (CI does this on push to main)
```

Or via the `Makefile`:

```bash
make up / make down  # start / stop the backgrounded dev server (:3000)
make typecheck lint test
make test-e2e        # Playwright E2E (CI-only on this WSL2 host)
make test-smoke      # build + curl every route, checking content
make test-all        # typecheck → lint → test → test-smoke  (full local gate)
make build-worker    # OpenNext Cloudflare build
make preview         # local workerd preview
make clean           # rm -rf .next .open-next .wrangler
```

Run the full local gate before pushing: `make test-all` (or
`npm run lint && npm run typecheck && npm run test`).

> **Playwright note:** `npm run test:e2e` runs 4 spec files against the real Workers
> runtime (`npm run preview` on :8787). In CI (ubuntu-22.04) Playwright installs
> Chromium automatically. On this WSL2 host Playwright's Chromium binaries are
> incompatible — push to `dev`/`preview` to trigger the `e2e.yml` check instead,
> or set `PLAYWRIGHT_EXECUTABLE_PATH` to a separately-installed Chromium binary.

## Conventions

- **Styling:** Tailwind v4 with design tokens defined in `src/app/globals.css`.
  Reference colors as `var(--color-*)` — don't hardcode hex in components.
- **Path alias:** `@/` → `src/` (see `tsconfig.json`).
- **Tests:** Vitest, co-located as `*.test.tsx`, jsdom environment.
- **Custom domains** in `wrangler.toml` are commented out until the amelialass.com
  DNS zone is Active (see README "Going live"). Until then deploys land on
  `*.workers.dev`.

## CI/CD

GitHub Actions workflows:

| File | Triggers | What it does |
|------|----------|--------------|
| `quality.yml` | push/PR to `main`/`dev`/`preview` | lint · typecheck · Vitest unit tests (parallel: `quality` + `smoke` jobs) |
| `e2e.yml` | push/PR to `main`/`dev`/`preview` | Playwright E2E on ubuntu-22.04 against real workerd; uploads report on failure |
| `deploy.yml` | push to `main` | quality gate → build:worker → deploy production → sync Worker secrets |
| `deploy-preview.yml` | push to `preview` | same, targets `amelia-online-preview` env |

Deploys authenticate via `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repo secrets.
`GROWNUPS_PASSWORD`, `SESSION_SECRET`, and `INVITE_SLUG` are also GitHub repo secrets;
the deploy workflows sync them to Cloudflare Worker secrets via `wrangler secret put`
after each deploy.
