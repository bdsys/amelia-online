# amelia-online

[![Quality](https://img.shields.io/github/actions/workflow/status/bdsys/amelia-online/quality.yml?branch=main&style=flat-square&label=quality)](https://github.com/bdsys/amelia-online/actions/workflows/quality.yml)
[![E2E](https://img.shields.io/github/actions/workflow/status/bdsys/amelia-online/e2e.yml?branch=main&style=flat-square&label=e2e)](https://github.com/bdsys/amelia-online/actions/workflows/e2e.yml)
[![Deploy](https://img.shields.io/github/actions/workflow/status/bdsys/amelia-online/deploy.yml?branch=main&style=flat-square&label=deploy)](https://github.com/bdsys/amelia-online/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](#license)

A playful personal website for Amelia — **amelialass.com**. Right now it's a
placeholder "coming soon" page whose job is to prove the infrastructure and CI/CD
are wired correctly. A designer will build the real site on top of this scaffold.

Update "grownups" content at content/grownups.json

It mirrors the deployment architecture of [andrewlass.com](https://andrewlass.com):
**Next.js 16 (App Router) + React 19 + Tailwind CSS v4**, deployed to **Cloudflare
Workers** via the [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare)
adapter, with GitHub Actions for CI/CD.

## Local development

```bash
npm install
npm run dev          # Next.js dev server on http://localhost:3000
```

There's also a `Makefile` for convenience:

```bash
make up               # start the dev server (backgrounded) on :3000
make down             # stop it (and sweep any orphaned process on the port)
make test-all         # typecheck → lint → unit tests → build + route smoke test
make test-smoke       # build, then curl every route and check content
make build-worker     # OpenNext Cloudflare build → .open-next/
make preview          # local Workers-runtime (workerd) preview of the built worker
make clean            # rm -rf .next .open-next .wrangler
```

Quality gate (matches CI — run before pushing):

```bash
npm run lint         # ESLint        (make lint)
npm run typecheck    # tsc --noEmit  (make typecheck)
npm run test         # Vitest        (make test)
```

Build + preview in the real Workers runtime locally:

```bash
npm run build:worker # OpenNext Cloudflare build → .open-next/
npm run preview      # Run the built Worker locally (workerd)
```

## Branches & environments

```
feature/* or fix/*  ──PR──▶  dev  ──PR──▶  preview  ──PR──▶  main
   (CI on PR)              (CI checks)   (deploys staging)  (deploys prod)
```

| Branch      | Purpose                       | On push                                   | URL                          |
| ----------- | ----------------------------- | ----------------------------------------- | ---------------------------- |
| `feature/*` | a single feature or bugfix    | CI runs when you open a PR into `dev`     | —                            |
| `dev`       | integration / initial CI gate | quality checks (no deploy)                | —                            |
| `preview`   | staging                       | quality gate → deploy preview Worker      | https://preview.www.amelialass.com |
| `main`      | production                    | quality gate → deploy production Worker   | https://amelialass.com       |

Open feature/fix branches off `dev`, PR them into `dev`, then promote `dev → preview`
(check staging) → `preview → main` (go live).

## Deployment

CI/CD is automated via GitHub Actions:

| Workflow              | Trigger                        | Action                                                           |
| --------------------- | ------------------------------ | ---------------------------------------------------------------- |
| `quality.yml`         | push/PR `main`,`dev`,`preview` | lint · typecheck · unit tests (parallel: + curl smoke test)      |
| `e2e.yml`             | push/PR `main`,`dev`,`preview` | Playwright E2E on ubuntu-22.04 against real Workers runtime      |
| `deploy.yml`          | push `main`                    | quality gate → `build:worker` → deploy (production) → sync secrets |
| `deploy-preview.yml`  | push `preview`                 | quality gate → `build:worker` → deploy (preview env) → sync secrets |

Wrangler authenticates from two repo secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### First-time Cloudflare setup

amelialass.com lives on its **own Cloudflare account**. One-time steps (dashboard):

1. Add `amelialass.com` as a site; update the registrar nameservers; wait for the
   zone to show **Active**.
2. Copy the **Account ID** (Workers & Pages overview).
3. Create a scoped **API token**: _Account › Workers Scripts › Edit_, _Account ›
   Account Settings › Read_; and for custom domains _Zone › Workers Routes › Edit_ +
   _Zone › DNS › Edit_ + _Zone › Zone › Read_ on the amelialass.com zone.
4. Set the repo secrets:
   ```bash
   gh secret set CLOUDFLARE_API_TOKEN  --repo bdsys/amelia-online
   gh secret set CLOUDFLARE_ACCOUNT_ID --repo bdsys/amelia-online
   ```

### Going live (two stages)

- **Stage A — prove the wiring:** with the `custom_domain` routes in `wrangler.toml`
  left commented out, push to `main`. The deploy lands on the account's
  `amelia-online.<subdomain>.workers.dev` URL — no DNS required.
- **Stage B — attach the domain:** once the zone is **Active**, uncomment the
  `[[routes]]` (and `[[env.preview.routes]]`) blocks in `wrangler.toml` and push
  again. The site goes live at `https://amelialass.com`.

## Project layout

```
src/app/
  layout.tsx          # fonts (Baloo 2 + Nunito) + metadata
  page.tsx            # the coming-soon hero
  page.test.tsx       # unit test for the hero
  globals.css         # Tailwind v4 + design tokens
  icon.tsx            # favicon (next/og)
  opengraph-image.tsx # social card (next/og)
  robots.ts / sitemap.ts
  not-found.tsx / error.tsx
wrangler.toml         # Worker config (production + preview, custom domains staged)
.github/workflows/    # quality, e2e, deploy, deploy-preview
tests/e2e/            # Playwright E2E specs (runs in CI on ubuntu-22.04)
```

## License

MIT
