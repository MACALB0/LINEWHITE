const { test, expect } = require('@playwright/test');

const {
    LoginPage
} = require('./pages/LoginPage');

const {
    DashboardPage
} = require('./pages/DashboardPage');

const {
    usuarios
} = require('../../test-data/usuarios');

test.describe('Flujo de cierre de sesión', () => {

    test('Debe cerrar sesión y regresar al login', async ({
        page
    }) => {
        test.skip(
            !usuarios.valido.usuario ||
            !usuarios.valido.contrasena,
            'Se requieren E2E_USERNAME y E2E_PASSWORD'
        );

        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await loginPage.visitar();

        await loginPage.completarCredenciales(
            usuarios.valido.usuario,
            usuarios.valido.contrasena
        );

        await Promise.all([
            page.waitForURL('**/index', {
                timeout: 30_000
            }),
            loginPage.hacerClicEnIniciarSesion()
        ]);

        await expect(page).toHaveURL(/\/index$/);

        await dashboardPage.cerrarSesion();

        await expect(page).toHaveURL(/\/$/);
        await expect(
            loginPage.loginButton
        ).toBeVisible();
    });

});