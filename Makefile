.PHONY: up down build build-worker preview lint typecheck test test-smoke test-all clean

DEV_PORT   ?= 3000
SMOKE_PORT ?= 3002

# ── Dev server ───────────────────────────────────────────────────────────────
# Hot-reload Turbopack dev server, backgrounded. Distinct from test-smoke which
# builds + serves the production output on SMOKE_PORT.

up:
	@bash scripts/dev.sh up $(DEV_PORT)

down:
	@bash scripts/dev.sh down $(DEV_PORT)

# ── Individual steps ─────────────────────────────────────────────────────────

build:
	npm run build

# OpenNext Cloudflare build → .open-next/ (the artifact CI deploys).
build-worker:
	npm run build:worker

# Local Workers-runtime (workerd) preview of the built worker.
preview:
	npm run preview

lint:
	npm run lint

typecheck:
	npm run typecheck

test:
	npm run test

# ── Smoke test ───────────────────────────────────────────────────────────────
# Builds the app, starts it, curls every route, kills the server.
# No browser required — runs anywhere.
# Note: smoke.sh kills any existing process on the port before starting, to
# prevent zombie servers from silently serving stale content.

test-smoke: build
	@bash scripts/smoke.sh $(SMOKE_PORT)

# ── Full local gate ──────────────────────────────────────────────────────────
# typecheck → lint → unit tests → build + smoke.
# (Playwright E2E is not used in this repo; CI runs quality on push/PR.)

test-all: typecheck lint test test-smoke
	@echo ""
	@echo "✓ All local gates passed."

# ── Utilities ────────────────────────────────────────────────────────────────

clean:
	rm -rf .next .open-next .wrangler
