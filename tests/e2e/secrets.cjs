/**
 * Throwaway E2E test credentials — committed intentionally (not real secrets).
 *
 * These values are used in CI only, written to .dev.vars before workerd starts
 * (see write-dev-vars.cjs and .github/workflows/e2e.yml). They are also imported
 * by specs that need to know what password/slug to submit, keeping the values in
 * one place so tests and the server can never drift.
 *
 * DO NOT use real site passwords/slugs here.
 */
module.exports = {
  GROWNUPS_PASSWORD: "e2e-test-password-amelia-playground",
  SESSION_SECRET: "e2e-test-session-secret-min-32-chars-padded!!",
  INVITE_SLUG: "e2e-test-invite-slug",
};
