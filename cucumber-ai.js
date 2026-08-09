module.exports = {
  default: {
    paths: [
      "tests/ai-generated/e2e/**/*.feature"
    ],

    require: [
      "tests/e2e/support/**/*.js",
      "tests/e2e/steps/**/*.js",
      "tests/ai-generated/e2e/steps/**/*.js"
    ],

    format: [
      "progress",
      "json:reports/cucumber-ai-report.json"
    ],

    parallel: 1,

    retry: 0,

    timeout: 60000
  }
};