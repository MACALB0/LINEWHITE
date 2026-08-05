const {
  setWorldConstructor
} = require("@cucumber/cucumber");

class PlaywrightWorld {
  constructor({ attach, parameters }) {
    this.attach = attach;
    this.parameters = parameters;

    this.browser = null;
    this.context = null;
    this.page = null;

    this.dialogMessage = null;
  }
}

setWorldConstructor(PlaywrightWorld);