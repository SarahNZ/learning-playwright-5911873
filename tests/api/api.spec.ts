import { test, expect } from "@playwright/test";

const baseApiUrl = "https://api.practicesoftwaretesting.com";

test("GET /products", async ({ request }) => {
  const response = await request.get(baseApiUrl + "/products");

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.length).toBe(9);
  expect(body.total).toBe(50);
  // console.log(body);
});

// Get a product with a specific ID and validate the information returned is correct
// Note the product IDs get updated every 2 hours. Need to find a way to get the current product ID reliably

test("POST /users/login", async ({ request }) => {
  const response = await request.post(baseApiUrl + "/users/login", {
    data: {
      email: "customer3@practicesoftwaretesting.com",
      password: "pass123",
    },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.access_token).toBeTruthy();
});
