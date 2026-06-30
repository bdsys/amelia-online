import { test, expect } from "@playwright/test";

/**
 * SEO / infrastructure routes.
 *
 * These routes are public and work under `next start` too, but since the webServer
 * is already booting the full Worker for other specs, we check them here as well.
 */
test.describe("SEO routes", () => {
  test("robots.txt is served and contains Disallow", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
    const body = await response!.text();
    expect(body).toContain("Disallow");
  });

  test("sitemap.xml is served and contains the site URL", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
    const body = await response!.text();
    expect(body).toContain("amelialass.com");
  });
});
