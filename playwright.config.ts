/**
 * Playwright E2E configuration.
 *
 * IMPORTANT — local browser limitation:
 * Playwright's prebuilt Chromium binaries do not support new Ubuntu releases
 * (including the Ubuntu 24.04+ base used by WSL2 on this machine). E2E tests run
 * in GitHub Actions CI (ubuntu-22.04) where `playwright install chromium` works.
 *
 * To run E2E locally:
 *   - macOS / Windows / Ubuntu ≤ 24.04: `npx playwright install chromium` then `npm run test:e2e`
 *   - Ubuntu 24.04+ (WSL2): push to dev/preview and let CI run them, or set
 *     PLAYWRIGHT_EXECUTABLE_PATH to a Chromium/Chrome binary installed separately.
 *
 * CI command: see .github/workflows/e2e.yml — writes .dev.vars, then runs this config.
 *
 * Server: `npm run preview` (opennextjs-cloudflare / workerd on :8787) instead of
 * `next start`, because getCloudflareContext — used by the grown-ups login, middleware,
 * and invite page — only resolves in the real Workers runtime, not in Node.js.
 * workerd reads secrets from .dev.vars; in CI that file is written before tests run.
 * Locally: keep your own .dev.vars and a running `npm run preview` instance.
 */
import { defineConfig, devices } from "@playwright/test";

const PORT = 8787;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false, // single worker to share one workerd instance
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
    // Disable infinite CSS animations (pg-bob, pg-pulse) so elements are stable for clicks.
    // globals.css ships `@media (prefers-reduced-motion: reduce) { *[style*="animation"] { animation: none } }`
    // which matches every inline-animated element in this app.
    // In Playwright ≥1.61 reducedMotion lives under contextOptions (not top-level use).
    contextOptions: {
      reducedMotion: "reduce",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Playwright builds the Worker and boots workerd before running specs.
  // In CI: .dev.vars is written by the workflow step before `npm run test:e2e`.
  // Locally: set reuseExistingServer (the default when CI is unset) and keep your
  //   own workerd running on :${PORT} with your real .dev.vars.
  webServer: {
    command: "npm run build:worker && npm run preview",
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000, // build:worker can be slow
  },
});
