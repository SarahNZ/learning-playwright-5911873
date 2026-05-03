import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login/loginPage";

test("Login without page object", async ({ page }) => {
  await page.goto("http://practicesoftwaretesting.com/");
  await page.getByTestId("nav-sign-in").click();
  await page.getByTestId("email").fill("customer@practicesoftwaretesting.com");
  await page.getByTestId("password").fill("welcome01");
  await page.getByTestId("login-submit").click();
  await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  await expect(page.getByTestId("page-title")).toContainText("My account");
});

test("Login with page object", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("customer@practicesoftwaretesting.com", "welcome01");
  await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
});
