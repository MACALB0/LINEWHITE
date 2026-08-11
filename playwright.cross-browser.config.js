const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',

  timeout: 60000,

  expect: {
    timeout: 10000
  },

  fullyParallel: false,

  workers: 1,

  retries: 0,

  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'reports/cross-browser-html',
        open: 'never'
      }
    ]
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:7055',

    trace: 'retain-on-failure',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure'
  },

  projects: [
    // =====================================================
    // DESKTOP
    // =====================================================

    {
      name: 'desktop-chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    },

    {
      name: 'desktop-firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    },

    {
      name: 'desktop-webkit',
      use: {
        ...devices['Desktop Safari']
      }
    },

    // =====================================================
    // MOBILE
    // =====================================================

    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 7']
      }
    },

    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 14']
      }
    },

    // =====================================================
    // TABLET
    // =====================================================

    {
      name: 'tablet',
      use: {
        ...devices['iPad Pro 11']
      }
    }
  ]
});