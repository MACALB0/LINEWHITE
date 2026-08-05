module.exports = {
  default: {
    paths: [
      "tests/e2e/features/**/*.feature"
    ],

    require: [
      "tests/e2e/support/**/*.js",
      "tests/e2e/steps/**/*.js"
    ],

    format: [
      "progress",
      "json:reports/cucumber-report.json"
    ],

    parallel: 1,

    retry: 0,

    timeout: 60000
  }
};