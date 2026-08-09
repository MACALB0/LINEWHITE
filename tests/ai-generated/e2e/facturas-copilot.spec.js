const {
    test,
    expect
} = require('@playwright/test');

const {
    LoginPage
} = require('../../e2e/pages/LoginPage');

const {
    FacturasPage
} = require('./pages/FacturasPage');

const {
    usuarios
} = require('../../../test-data/usuarios');


async function authenticateUser(page) {

    if (
        !usuarios.valido.usuario ||
        !usuarios.valido.contrasena
    ) {
        throw new Error(
            'Se requieren E2E_USERNAME y E2E_PASSWORD'
        );
    }

    const loginPage =
        new LoginPage(page);

    await loginPage.visitar();

    await loginPage.completarCredenciales(
        usuarios.valido.usuario,
        usuarios.valido.contrasena
    );

    await Promise.all([
        page.waitForURL(
            '**/index',
            {
                timeout: 60000,
                waitUntil: 'domcontentloaded'
            }
        ),

        loginPage.hacerClicEnIniciarSesion()
    ]);

    await expect(page).toHaveURL(
        /\/index$/
    );
}


test.describe(
    'Facturas',
    () => {

        test(
            'debe abrir el módulo de facturas y mostrar la tabla con al menos una fila',
            async ({ page }) => {

                await authenticateUser(page);

                const facturasPage =
                    new FacturasPage(page);

                await facturasPage
                    .openFromSidebar();

                await facturasPage
                    .verifyPageLoaded();

                await facturasPage
                    .verifyTableVisible();

                const totalFilas =
                    await facturasPage.rowCount();

                expect(
                    totalFilas
                ).toBeGreaterThan(0);
            }
        );
    }
);