const {
  Given,
  When,
  Then
} = require("@cucumber/cucumber");

const {
  expect
} = require("@playwright/test");

const {
  LoginPage
} = require("../pages/LoginPage");

const {
  InventarioPage
} = require("../pages/InventarioPage");

const {
  OrdenesTecnicasPage
} = require("../pages/OrdenesTecnicasPage");

const {
  usuarios
} = require("../../../test-data/usuarios");

Given(
  "que he iniciado sesión correctamente",
  async function () {
    if (
      !usuarios.valido.usuario ||
      !usuarios.valido.contrasena
    ) {
      throw new Error(
        "Se requieren E2E_USERNAME y E2E_PASSWORD"
      );
    }

    this.loginPage = new LoginPage(this.page);

    await this.loginPage.visitar();

    await this.loginPage.completarCredenciales(
      usuarios.valido.usuario,
      usuarios.valido.contrasena
    );

    await Promise.all([
      this.page.waitForURL("**/index", {
        timeout: 60000,
        waitUntil: "domcontentloaded"
      }),

      this.loginPage.hacerClicEnIniciarSesion()
    ]);

    await expect(this.page).toHaveURL(
      /\/index$/
    );
  }
);

When(
  "selecciono el módulo de Inventario",
  async function () {
    this.inventarioPage =
      new InventarioPage(this.page);

    await this.inventarioPage
      .abrirDesdeMenu();
  }
);

Then(
  "debo visualizar la página de Inventario",
  async function () {
    await expect(this.page).toHaveURL(
      /\/inventario$/
    );

    await expect(
      this.inventarioPage.titulo
    ).toBeVisible();
  }
);

Then(
  "debo visualizar la tabla de productos",
  async function () {
    await this.inventarioPage
      .esperarCargaDeTabla();

    await expect(
      this.inventarioPage.tablaProductos
    ).toBeVisible();

    const filas =
      await this.inventarioPage
        .cantidadDeFilas();

    expect(filas).toBeGreaterThan(0);
  }
);

When(
  "selecciono el módulo de Órdenes Técnicas",
  async function () {
    this.ordenesPage =
      new OrdenesTecnicasPage(this.page);

    await this.ordenesPage
      .abrirDesdeMenu();
  }
);

Then(
  "debo visualizar la página de Órdenes Técnicas",
  async function () {
    await expect(this.page).toHaveURL(
      /\/ordenes_tecnicas$/
    );

    await expect(
      this.ordenesPage.titulo
    ).toBeVisible();
  }
);

Then(
  "debo visualizar la tabla de órdenes técnicas",
  async function () {
    await this.ordenesPage
      .esperarCargaDeTabla();

    await expect(
      this.ordenesPage.tablaOrdenes
    ).toBeVisible();

    const filas =
      await this.ordenesPage
        .cantidadDeFilas();

    expect(filas).toBeGreaterThan(0);
  }
);