/**
 * LABORATORIO 5.1 — IA integrada al Proyecto Integrador
 *
 * Steps adicionales requeridos después de revisar
 * los escenarios BDD generados mediante IA.
 *
 * Solo se implementan comportamientos que no estaban
 * disponibles en la suite BDD original.
 */

const {
  Given,
  When,
  Then,
} = require("@cucumber/cucumber");

const {
  expect,
} = require("@playwright/test");


/*
 * =========================================================
 * AI-BDD-03
 * Protección de rutas sin sesión
 * =========================================================
 */

Given(
  "que no tengo una sesión autenticada",
  async function () {

    /*
     * Limpiamos cookies para garantizar que el escenario
     * sea independiente de autenticaciones anteriores.
     */
    await this.context.clearCookies();
  }
);


When(
  "intento acceder directamente al dashboard",
  async function () {

    await this.page.goto(
      "http://127.0.0.1:7055/index"
    );
  }
);


Then(
  "debo ser redirigido a la página de inicio de sesión",
  async function () {

    await expect(
      this.page
    ).toHaveURL(
      /\/$/
    );
  }
);


/*
 * =========================================================
 * AI-BDD-08
 * Cierre de sesión
 * =========================================================
 */

When(
  "cierro la sesión",
  async function () {

    await this.page.goto(
      "http://127.0.0.1:7055/api/logout"
    );
  }
);


Then(
  "debo regresar a la página de inicio de sesión",
  async function () {

    await expect(
      this.page
    ).toHaveURL(
      /\/$/
    );
  }
);