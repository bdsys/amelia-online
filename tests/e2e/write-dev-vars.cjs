/**
 * Writes throwaway E2E test credentials to .dev.vars so workerd (`npm run preview`)
 * picks them up at boot. Called in CI before `npm run test:e2e`.
 *
 * Not needed locally if you already have a .dev.vars with real or test creds.
 * Must run BEFORE the webServer starts (i.e. before `npm run test:e2e`), because
 * workerd reads .dev.vars at startup — not on each request.
 */
const path = require("path");
const fs = require("fs");
const s = require("./secrets.cjs");

const content = [
  `GROWNUPS_PASSWORD=${s.GROWNUPS_PASSWORD}`,
  `SESSION_SECRET=${s.SESSION_SECRET}`,
  `INVITE_SLUG=${s.INVITE_SLUG}`,
].join("\n") + "\n";

const dest = path.join(__dirname, "../../.dev.vars");
fs.writeFileSync(dest, content);
console.log("Wrote .dev.vars for E2E tests (throwaway creds — NOT real site secrets)");
