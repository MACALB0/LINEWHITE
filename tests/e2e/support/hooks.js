const {
  Before,
  After,
  Status,
  setDefaultTimeout
} = require("@cucumber/cucumber");

const {
  chromium
} = require("@playwright/test");

setDefaultTimeout(60 * 1000);

Before(async function () {
  this.browser = await chromium.launch({
    headless: true
  });

  this.context = await this.browser.newContext({
    baseURL:
      process.env.BASE_URL ||
      "http://127.0.0.1:7055"
  });

  this.page = await this.context.newPage();

  this.dialogMessage = null;
});

After(async function (scenario) {
  if (
    scenario.result?.status === Status.FAILED &&
    this.page
  ) {
    const screenshot = await this.page.screenshot({
      fullPage: true
    });

    await this.attach(
      screenshot,
      "image/png"
    );
  }

  if (this.context) {
    await this.context.close();
  }

  if (this.browser) {
    await this.browser.close();
  }
});