import { test, expect } from "@playwright/test";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { INVITE_SLUG } = require("./secrets.cjs") as { INVITE_SLUG: string };

/**
 * Invite slug gate (/i/[slug]).
 *
 * getCloudflareContext is used to read INVITE_SLUG at request time, so this requires
 * the real Workers runtime (`npm run preview`) — not `next start`.
 *
 * Assertions target structural content (the "You're invited!" heading) only, never
 * private party details (address, RSVP email, etc.).
 */
test.describe("Invite slug", () => {
  test("wrong slug returns 404", async ({ page }) => {
    const response = await page.goto("/i/definitely-not-the-right-slug");
    expect(response?.status()).toBe(404);
  });

  test("correct slug renders the invite", async ({ page }) => {
    await page.goto(`/i/${INVITE_SLUG}`);
    await expect(page.getByRole("heading", { name: /You're invited!/i })).toBeVisible();
  });
});
