import { test, expect } from "@playwright/test";

const username = "Bob Smith";

test.describe("E2E - Buy products", () => {
  test.use({ storageState: ".auth/customer03.json" });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("nav-menu")).toContainText(username);
    await page.getByTestId("nav-home").click();
    await expect(
      page.getByTitle("Practice Software Testing - Toolshop"),
    ).toBeVisible();
  });

  test("Auth user purchases a product using buy now", async ({ page }) => {
    await test.step("Search for a product and check result", async () => {
      await page.getByTestId("search-query").fill("thor hammer");
      await page.getByTestId("search-submit").click();
      await expect(page.getByAltText(/thor hammer/i)).toBeVisible();
    });

    await test.step("Select an item and check result", async () => {
      await page.getByAltText(/thor hammer/i).click();
      await expect(page.getByTestId("product-description")).toContainText(
        /Thor Hammer/i,
      );
      await expect(
        page.getByRole("spinbutton", { name: "Quantity" }),
      ).toHaveValue("1");
    });

    await test.step("Add an item to the cart and check result", async () => {
      await page.getByTestId("add-to-cart").click();
      await expect(page.getByRole("alert")).toContainText(
        /Product added to shopping cart/i,
      );
      await expect(page.getByTestId("cart-quantity")).toContainText("1");
    });

    await test.step("View cart and check results", async () => {
      await page.getByTestId("nav-cart").click();
      await expect(page).toHaveURL(/\/checkout$/);
      await expect(page.getByTestId("product-title")).toContainText(
        /Thor Hammer/i,
      );
      await expect(
        page.getByRole("spinbutton", { name: "Quantity for Thor Hammer" }),
      ).toHaveValue("1");
      await expect(page.getByTestId("product-price")).toContainText("$11.14");
      await expect(page.getByTestId("line-price")).toContainText("$11.14");
      await expect(page.getByTestId("cart-total")).toContainText("$11.14");
    });

    await test.step("Progress to Billing Address page and enter details", async () => {
      await page.getByTestId("proceed-1").click();
      // Need to click the 'Proceed to checkout' button again, as already logged in message is displayed (not good usability, assume it's expected behaviour)
      await page.getByTestId("proceed-2").click();
      await expect(
        page.getByRole("heading", { name: /Billing Address/i }),
      ).toBeVisible();

      await page
        .getByRole("combobox", { name: "Country" })
        .selectOption("New Zealand");
      await page.getByTestId("postal_code").fill("0820");
      await page.getByTestId("house_number").fill("45");

      // Test website auto-fills Street, City and State

      await test.step("Progress to payment page and enter details", async () => {
        // Need to wait until the proceed button is enabled
        const proceedToPayment = page.getByTestId("proceed-3");
        await expect(proceedToPayment).toBeEnabled({ timeout: 20000 });
        await proceedToPayment.click();

        await expect(
          page.getByRole("heading", { name: /Payment/i }),
        ).toBeVisible();
        await page
          .getByRole("combobox", { name: /Payment Method/i })
          .selectOption("Buy Now Pay Later");
        await page
          .getByRole("combobox", { name: "Monthly Installments" })
          .selectOption("3 Monthly Installments");
      });

      await test.step("Confirm payment", async () => {
        await page.getByTestId("finish").click();
        await expect(page.getByTestId("payment-success-message")).toBeVisible();
      });

      await test.step("Visual test for final payment page", async () => {
        await page.waitForLoadState("networkidle");
        await expect(page).toHaveScreenshot(
          "checkout-page-payment-successful-customer_03.png",
          {
            mask: [page.getByTitle("Practice Software Testing - Toolshop")],
          },
        );
      });

      await test.step("Sign out", async () => {
        await page.getByRole("button", { name: /Bob Smith/i }).click();
        await page.getByTestId("nav-sign-out").click();
        await expect(page.getByTestId("nav-sign-in")).toContainText(/Sign in/i);
      });
    });
  });
});
