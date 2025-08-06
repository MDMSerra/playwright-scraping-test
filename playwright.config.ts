import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright-automation',
  timeout: 30_000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    }
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
});
