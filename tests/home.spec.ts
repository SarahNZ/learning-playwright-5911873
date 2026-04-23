import { test, expect } from "@playwright/test";

test("Home page", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  // Ensure the sign-in link is present
  await expect(page.getByTestId("nav-sign-in")).toContainText(/sign in/i);

  // Check the title of the page

  // Check the count of items displayed

  // Search for Thor Hammer and check result
});
