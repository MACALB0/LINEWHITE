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
  usuarios
} = require("../../../test-data/usuarios");

Given(
  "que estoy en la página de inicio de sesión",
  async function () {
    this.loginPage = new LoginPage(this.page);

    await this.loginPage.visitar();

    await expect(this.page).toHaveURL(/\/$/);
  }
);

Then(
  "debo visualizar el campo de usuario",
  async function () {
    await expect(
      this.loginPage.usuarioInput
    ).toBeVisible();
  }
);

Then(
  "debo visualizar el campo de contraseña",
  async function () {
    await expect(
      this.loginPage.contrasenaInput
    ).toBeVisible();
  }
);

Then(
  "debo visualizar el botón de iniciar sesión",
  async function () {
    await expect(
      this.loginPage.loginButton
    ).toBeVisible();
  }
);

When(
  "presiono iniciar sesión sin escribir credenciales",
  async function () {
    const dialogPromise = new Promise(
      (resolve) => {
        this.page.once(
          "dialog",
          async (dialog) => {
            const message = dialog.message();

            await dialog.accept();

            resolve(message);
          }
        );
      }
    );

    await this.loginPage
      .hacerClicEnIniciarSesion();

    this.dialogMessage =
      await dialogPromise;
  }
);

When(
  "intento iniciar sesión con un usuario inexistente",
  async function () {
    const dialogPromise = new Promise(
      (resolve) => {
        this.page.once(
          "dialog",
          async (dialog) => {
            const message = dialog.message();

            await dialog.accept();

            resolve(message);
          }
        );
      }
    );

    await this.loginPage.iniciarSesion(
      usuarios.inexistente.usuario,
      usuarios.inexistente.contrasena
    );

    this.dialogMessage =
      await dialogPromise;
  }
);

Then(
  "debo visualizar la alerta {string}",
  async function (mensajeEsperado) {
    expect(
      this.dialogMessage.toUpperCase()
    ).toContain(
      mensajeEsperado.toUpperCase()
    );
  }
);

Then(
  "debo permanecer en la página de inicio de sesión",
  async function () {
    await expect(this.page).toHaveURL(/\/$/);

    await expect(
      this.loginPage.loginButton
    ).toBeVisible();
  }
);

When(
  "ingreso credenciales válidas",
  async function () {
    if (
      !usuarios.valido.usuario ||
      !usuarios.valido.contrasena
    ) {
      throw new Error(
        "Se requieren E2E_USERNAME y E2E_PASSWORD"
      );
    }

    await this.loginPage
      .completarCredenciales(
        usuarios.valido.usuario,
        usuarios.valido.contrasena
      );

    await Promise.all([
      this.page.waitForURL(
        "**/index",
        {
          timeout: 60000,
          waitUntil: "domcontentloaded"
        }
      ),

      this.loginPage
        .hacerClicEnIniciarSesion()
    ]);
  }
);

Then(
  "debo acceder al dashboard",
  async function () {
    await expect(this.page).toHaveURL(
      /\/index$/
    );
  }
);