
import { test, expect } from '@playwright/test';

test('verifies proverbs version', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Click the version switcher
  await page.click('button[role="combobox"]');

  // Click the "Proverbs" option
  await page.click('div[role="option"]:has-text("Proverbs")');

  // Wait for the new content to load
  await page.waitForSelector('text=/Proverbs \\d+:\\d+/');

  // Take a screenshot
  await page.screenshot({ path: 'proverbs-version.png' });

  // Assert that a proverb is visible
  const proverbsText = await page.locator('text=/Proverbs \\d+:\\d+/').first().textContent();
  expect(proverbsText).not.toBeNull();
});
