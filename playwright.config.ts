import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './',
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
