const { expect } = require('@playwright/test');

const {
    LoginPage
} = require('../pages/LoginPage');

const {
    usuarios
} = require('../../../test-data/usuarios');

async function autenticarUsuario(page) {
    if (
        !usuarios.valido.usuario ||
        !usuarios.valido.contrasena
    ) {
        throw new Error(
            'Se requieren E2E_USERNAME y E2E_PASSWORD'
        );
    }

    const loginPage = new LoginPage(page);

    await loginPage.visitar();

    await loginPage.completarCredenciales(
        usuarios.valido.usuario,
        usuarios.valido.contrasena
    );

    let mensajeAlerta = null;

    page.once('dialog', async (dialog) => {
        mensajeAlerta = dialog.message();
        await dialog.accept();
    });

    await Promise.all([
        page.waitForURL('**/index', {
            timeout: 60_000,
            waitUntil: 'domcontentloaded'
        }),
        loginPage.hacerClicEnIniciarSesion()
    ]);

    expect(
        mensajeAlerta,
        `El login mostró una alerta: ${mensajeAlerta}`
    ).toBeNull();

    await expect(page).toHaveURL(/\/index$/, {
        timeout: 10_000
    });
}

module.exports = {
    autenticarUsuario
};