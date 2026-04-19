import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Playwright logo Playwright' }).click();
  await page.getByText('Community').click();
  await page.getByText('Community').click();
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'Setting up CI' }).click();
  await page.getByRole('link', { name: 'Python' }).click();
  await page.getByRole('link', { name: 'How to set up GitHub Actions' }).click();
});