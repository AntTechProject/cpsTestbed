// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['json', { outputFile: 'test-results/test-results.json' }]],
  use: {
    trace: 'on-first-retry',
    baseURL: 'http://localhost:5173', // Adjust to your app's base URL
  },
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
