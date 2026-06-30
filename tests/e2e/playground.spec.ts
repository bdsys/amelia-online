import { test, expect } from "@playwright/test";

/**
 * Playground hub — real-browser E2E.
 *
 * The playground is a React client island (Playground.tsx); jsdom unit tests can't
 * fully exercise it. These specs verify actual rendering and navigation in Chromium.
 */
test.describe("Playground hub", () => {
  test("renders the hub with greeting, avatar, and all 8 activity cards", async ({
    page,
  }) => {
    await page.goto("/");

    // Greeting (matches "Good morning/afternoon/evening, Amelia and friends!")
    await expect(page.getByText(/Amelia and friends!/)).toBeVisible();

    // Avatar image
    await expect(page.getByAltText("Amelia")).toBeVisible();

    // All 8 activity card buttons
    for (const label of [
      "Pop!",
      "Bubbles",
      "Stickers",
      "Paint",
      "Dress Up",
      "Coloring",
      "Match",
      "ABCs",
    ]) {
      await expect(page.getByRole("button", { name: label })).toBeVisible();
    }

    // Grown-ups pill link
    await expect(page.getByRole("link", { name: /Grown-ups/i })).toBeVisible();
  });

  test("navigates to an activity screen and returns to hub via the home button", async ({
    page,
  }) => {
    await page.goto("/");

    // Click the "Pop!" activity card
    await page.getByRole("button", { name: "Pop!" }).click();

    // Hub cards are gone — we're on the Pop screen
    await expect(page.getByRole("button", { name: "Pop!" })).not.toBeVisible();

    // HomeButton renders with aria-label="Back to home" on every screen
    await page.getByRole("button", { name: "Back to home" }).click();

    // Hub re-renders with the greeting
    await expect(page.getByText(/Amelia and friends!/)).toBeVisible();
  });
});
