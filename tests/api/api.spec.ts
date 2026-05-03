import { test, expect } from "@playwright/test";

const baseApiUrl = "https://api.practicesoftwaretesting.com";

// Log in
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

// Get all products
test("GET /products", async ({ request }) => {
  const response = await request.get(baseApiUrl + "/products");

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.length).toBe(9);
  expect(body.total).toBe(50);
  console.log(body);
});

// Get a product with a specific ID and validate the information returned is correct
// Note the product IDs get updated every 2 hours. Need to find a way to get the current product ID reliably

// Do 2 API requests
// 1. To get the 'Thor Hammer' productId https://api.practicesoftwaretesting.com/products/search?q=thor%20hammer
//     I.e. Response is id: "01KQE1V5PXH4EPJZ97CCEMY4NA", name: "Thor Hammer"
// 2. To view the product details, using the ID we got dynamically.
//    I.e. Request URL
//api.practicesoftwaretesting.com/products/01KQE1V5PXH4EPJZ97CCEMY4NA/related

test.describe("Get products", () => {
  test("GET /products/{id}", async ({ request }) => {
    const apiUrl = "https://api.practicesoftwaretesting.com";
    const productResponse = await request.get(
      apiUrl + "/products/search?q=thor%20hammer",
    );
    expect(productResponse.status()).toBe(200);
    const productBody = await productResponse.json();

    const productId = productBody.data[0].id;
    const response = await request.get(apiUrl + "/products/" + productId);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe("Thor Hammer");
    expect(body.price).toBe(11.14);
    expect(body.in_stock).toBe(true);
    console.log(body);
  });
});
