const { defineConfig, devices } = require('@playwright/test')

const config = defineConfig({
  testDir: './e2e-tests',
  fullyParallel: false,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  // the app itself is started before the tests run, so the production build
  // must exist. `npm run build` is part of the pipeline.
  webServer: {
    command: 'npm run start-prod',
    url: 'http://localhost:5000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})

module.exports = config