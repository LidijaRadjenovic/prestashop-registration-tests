import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // shared remote demo: keep load low
  timeout: 60_000, // the demo shop instance can be slow to load
  expect: { timeout: 15_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://demo.prestashop.com/',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    // Chromium only: cross-browser coverage is out of scope (see README)
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});