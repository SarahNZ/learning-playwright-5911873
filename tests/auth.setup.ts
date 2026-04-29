import { test as setup, expect } from "@playwright/test";

setup("Create customer 03 auth", async ({ page, context }) => {
  const email = "customer3@practicesoftwaretesting.com";
  const password = "pass123";
  const username = "Bob Smith";
  const customer03AuthFile = ".auth/customer03.json";

  await page.goto("https://practicesoftwaretesting.com/auth/login");

  await page.getByTestId("email").fill(email);
  await page.getByTestId("password").fill(password);
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("nav-menu")).toContainText(username);

  // Save authentication state to file
  await context.storageState({ path: customer03AuthFile });
});
