import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './test/specs',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 2,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Global setup for test step logging */
  // globalSetup: require.resolve('./global-setup.ts'),
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', {
      open: 'never',
      outputFolder: './reports/html-report'
    }],
    ['list', { printSteps: true }], // Also enable built-in step printing
    ['blob', {
      outputDir: './reports/blob-report',
    }],
    ['allure-playwright', {
      outputFolder: './allure-results',
    }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || '',
    httpCredentials: {
      username: process.env.STANDARD_USER || '',
      password: process.env.PASSWORD || '',
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on',
    actionTimeout: 30 * 1000, // 30 seconds
    navigationTimeout: 60 * 1000, // 60 seconds
    testIdAttribute: 'data-test', // Custom testId attribute - getByTestId.('value')
  },
  timeout: 60 * 3 * 1000, // 3 minutes per test
  globalTimeout: 60 * 60 * 1000, // 60 minutes per test file
  expect: {
    timeout: 30 * 1000, // 30 seconds
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: {
          width: 1920,
          height: 1080,
        },
      },
    },
  ],
});