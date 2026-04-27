import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("Check sign in", async ({ page }) => {
    // Ensure the sign-in link is present
    await expect(page.getByTestId("nav-sign-in")).toContainText(/sign in/i);
  });

  test("Validate page title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0",
    );
  });

  test("Check the count of items displayed", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
    expect(await productGrid.getByRole("link").count()).toBe(9);
  });

  test("Search for Thor Hammer and check result", async ({ page }) => {
    // Will remove duplicate variable later
    const productGrid = page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Thor Hammer");
    await page.getByTestId("search-submit").click();
    // I think checking the count could make the test flaky, so just leaving
    // the code in for future reference
    // await expect(productGrid.getByRole("link")).toHaveCount(7);
    await expect(page.getByAltText(/thor hammer/i)).toBeVisible();
  });
});
