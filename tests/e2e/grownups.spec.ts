import { test, expect } from "@playwright/test";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { GROWNUPS_PASSWORD } = require("./secrets.cjs") as {
  GROWNUPS_PASSWORD: string;
};

/**
 * Grown-ups auth gate — full round-trip on the real Workers runtime.
 *
 * getCloudflareContext (used by middleware + login server action) only resolves under
 * workerd, so these tests must run against `npm run preview` — not `next start`.
 *
 * Assertions intentionally target structural UI (headings, links, error messages) and
 * never touch private wishlist content (addresses, items, RSVP email) so no real
 * personal data appears in the test suite.
 */
test.describe("Grown-ups auth", () => {
  test("unauthenticated /grownups redirects to login", async ({ page }) => {
    await page.goto("/grownups");
    await expect(page).toHaveURL(/\/grownups\/login/);
    await expect(page.getByRole("heading", { name: "Grown-ups only" })).toBeVisible();
  });

  test("wrong password shows error message", async ({ page }) => {
    await page.goto("/grownups/login");
    await page.getByPlaceholder("Password").fill("definitely-wrong-password");
    await page.getByRole("button", { name: /Enter/i }).click();

    // Redirected back to login with ?error=1
    await expect(page).toHaveURL(/error=1/);
    await expect(page.getByText(/Wrong password/i)).toBeVisible();
  });

  test("correct password grants access to the grown-ups menu", async ({ page }) => {
    await page.goto("/grownups/login");
    await page.getByPlaceholder("Password").fill(GROWNUPS_PASSWORD);
    await page.getByRole("button", { name: /Enter/i }).click();

    // Lands on the menu, not the login page
    await expect(page).toHaveURL(/\/grownups$/);
    await expect(
      page.getByRole("heading", { name: "Amelia's Grown-ups Corner" })
    ).toBeVisible();

    // All three wishlist / party links present
    await expect(page.getByRole("link", { name: /Christmas List/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Birthday List/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Party Invite/i })).toBeVisible();
  });

  test("authenticated cookie lets you access the menu on a subsequent visit", async ({
    page,
  }) => {
    // Log in once to set the cookie
    await page.goto("/grownups/login");
    await page.getByPlaceholder("Password").fill(GROWNUPS_PASSWORD);
    await page.getByRole("button", { name: /Enter/i }).click();
    await expect(page).toHaveURL(/\/grownups$/);

    // Navigate away and come back directly
    await page.goto("/");
    await page.goto("/grownups");
    await expect(page).toHaveURL(/\/grownups$/);
    await expect(
      page.getByRole("heading", { name: "Amelia's Grown-ups Corner" })
    ).toBeVisible();
  });

  test("wishlist pages render {label,url} card entries as Open › links", async ({
    page,
  }) => {
    // Log in to set the auth cookie
    await page.goto("/grownups/login");
    await page.getByPlaceholder("Password").fill(GROWNUPS_PASSWORD);
    await page.getByRole("button", { name: /Enter/i }).click();
    await expect(page).toHaveURL(/\/grownups$/);

    // Christmas wishlist
    await page.goto("/grownups/christmas");
    await expect(page.getByText("Open ›")).toBeVisible();

    // Birthday wishlist
    await page.goto("/grownups/birthday");
    await expect(page.getByText("Open ›")).toBeVisible();
  });
});
