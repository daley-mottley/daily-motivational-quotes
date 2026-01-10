
import { test, expect } from '@playwright/test';

test('verify version switcher UI', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await page.waitForSelector('body'); // Wait for the body to be loaded
  await page.screenshot({ path: 'screenshot.png' });
});
