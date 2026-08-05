const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/e2e",

  testIgnore: ["**/features/**", "**/steps/**"],

  /*
   * La aplicación usa sesiones, base de datos y el mismo usuario
   * de prueba. Ejecutamos los escenarios secuencialmente para
   * evitar conflictos entre logins simultáneos.
   */
  fullyParallel: false,
  workers: 1,

  forbidOnly: Boolean(process.env.CI),

  retries: process.env.CI ? 2 : 0,

  timeout: 60_000,

  expect: {
    timeout: 10_000,
  },

  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder: "reports/playwright-html",
        open: "never",
      },
    ],
    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
      },
    ],
  ],

  use: {
    baseURL: process.env.BASE_URL || "http://127.0.0.1:7055",

    headless: true,

    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",

    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  outputDir: "reports/test-results",

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  webServer: {
  command: "node ./bin/www",
  url: "http://127.0.0.1:7055",
  reuseExistingServer: false,
  timeout: 120_000,

  env: {
    ...process.env,

    NODE_ENV: "test",
    PORT: "7055",

    SESSION_SECRET:
      process.env.SESSION_SECRET ||
      "qa-test-secret",

    DB_HOST:
      process.env.DB_HOST ||
      "localhost",

    DB_PORT:
      process.env.DB_PORT ||
      "5432",

    DB_NAME:
      process.env.DB_NAME ||
      "line_white_service",

    DB_USER:
      process.env.DB_USER ||
      "postgres",

    DB_PASSWORD:
      process.env.DB_PASSWORD || ""
  }
}

});
