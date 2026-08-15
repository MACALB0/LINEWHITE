const { test, expect } = require('@playwright/test');

const {
    LoginPage
} = require('./pages/LoginPage');

const {
    usuarios
} = require('../../test-data/usuarios');

test.describe('Flujo de autenticación', () => {

    test('Debe mostrar correctamente la página de inicio de sesión', async ({
        page
    }) => {
        const loginPage = new LoginPage(page);

        await loginPage.visitar();

        await expect(loginPage.title).toBeVisible();
        await expect(loginPage.logo).toBeVisible();
        await expect(loginPage.usuarioInput).toBeVisible();
        await expect(loginPage.contrasenaInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('Debe mostrar una alerta cuando los campos están vacíos', async ({
        page
    }) => {
        const loginPage = new LoginPage(page);

        await loginPage.visitar();

        let mensajeAlerta = '';

        page.once('dialog', async (dialog) => {
            mensajeAlerta = dialog.message();
            await dialog.accept();
        });

        await loginPage.hacerClicEnIniciarSesion();

        expect(mensajeAlerta).toBe(
            'Debe ingresar usuario y contraseña'
        );

        await expect(page).toHaveURL(/\/$/);
    });

test('Debe rechazar un usuario inexistente', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.visitar();

    const mensajeAlertaPromise = new Promise((resolve) => {
        page.once('dialog', async (dialog) => {
            const mensaje = dialog.message();

            await dialog.accept();

            resolve(mensaje);
        });
    });

    await loginPage.iniciarSesion(
        usuarios.inexistente.usuario,
        usuarios.inexistente.contrasena
    );

    const mensajeAlerta = await mensajeAlertaPromise;

    expect(mensajeAlerta.toUpperCase()).toContain(
        'USUARIO NO EXISTE'
    );

    await expect(page).toHaveURL(/\/$/);
});

    test('Debe permitir iniciar sesión con credenciales válidas', async ({
        page
    }) => {
        // Esta prueba requiere credenciales E2E reales configuradas como secretos.
        // Se omite únicamente cuando E2E_USERNAME o E2E_PASSWORD no están disponibles.
        test.skip(
            !usuarios.valido.usuario ||
            !usuarios.valido.contrasena,
            'Se requieren E2E_USERNAME y E2E_PASSWORD'
        );

        const loginPage = new LoginPage(page);

        await loginPage.visitar();

        await loginPage.completarCredenciales(
            usuarios.valido.usuario,
            usuarios.valido.contrasena
        );

        await Promise.all([
            page.waitForURL('**/index', {
                timeout: 90_000
            }),
            loginPage.hacerClicEnIniciarSesion()
        ]);

        await expect(page).toHaveURL(/\/index$/);
    });

});