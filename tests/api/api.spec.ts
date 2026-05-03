import { test, expect } from "@playwright/test";

const apiUrl = "https://api.practicesoftwaretesting.com";

test("POST /users/login", async ({ request }) => {
  const response = await request.post(apiUrl + "/users/login", {
    data: {
      email: "customer3@practicesoftwaretesting.com",
      password: "pass123",
    },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.access_token).toBeTruthy();
});

test.describe("Get products", () => {
  test("GET /products", async ({ request }) => {
    const response = await request.get(apiUrl + "/products");
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.length).toBe(9);
    expect(body.total).toBe(50);
    console.log(body);
  });

  test("GET /products/{id}", async ({ request }) => {
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
