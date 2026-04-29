import { test, expect } from "@playwright/test";

const baseUrl = "https://practicesoftwaretesting.com/";
const username = "Jane Doe";

test.describe("Home page with no auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  // Visual tests had too much pixel drift between runs, so commenting out.
  // But leaving here for future reference
  // test("Visual test with no auth", async ({ page }) => {
  //   await page.waitForLoadState("networkidle");
  //   await expect(page).toHaveScreenshot("home-page-no-auth.png", {
  //     mask: [page.getByTitle("Practice Software Testing - Toolshop")],
  //   });
  // });

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
    await page.waitForLoadState("networkidle");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
    // expect(await productGrid.getByRole("link").count()).toBe(9);
  });

  test("Search for Thor Hammer and check result", async ({ page }) => {
    await page.getByTestId("search-query").fill("Thor Hammer");
    await page.getByTestId("search-submit").click();
    await expect(page.getByAltText(/thor hammer/i)).toBeVisible();
  });
});

test.describe("Home page customer 01 auth", () => {
  test.use({ storageState: ".auth/customer03.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  // Visual tests had too much pixel drift between runs, so commenting out.
  // But leaving here for future reference
  // test("Visual test authorized", async ({ page }) => {
  //   await page.waitForLoadState("networkidle");
  //   await expect(page).toHaveScreenshot("home-page-customer_01.png", {
  //     mask: [page.getByTitle("Practice Software Testing - Toolshop")],
  //   });
  // });

  test("Check customer 01 is signed in", async ({ page }) => {
    // await expect(page.getByTestId("navi-sign-in")).not.toBeVisible();
    await expect(page.getByTestId("nav-menu")).toContainText(username);
  });
});
