const {
    test,
    expect
} = require('@playwright/test');

const {
    OrdenesTecnicasPage
} = require('./pages/OrdenesTecnicasPage');

const {
    autenticarUsuario
} = require('./fixtures/auth');

const {
    usuarios
} = require('../../test-data/usuarios');

test.describe('Flujo de órdenes técnicas', () => {

   
    test.beforeEach(async ({ page }) => {
    test.skip(
        !usuarios.valido.usuario ||
        !usuarios.valido.contrasena,
        'Se requieren E2E_USERNAME y E2E_PASSWORD'
    );

    await autenticarUsuario(page);
});

    test('Debe acceder al módulo de órdenes técnicas desde el menú', async ({
        page
    }) => {
        const ordenesPage =
            new OrdenesTecnicasPage(page);

        await ordenesPage.abrirDesdeMenu();

        await expect(page).toHaveURL(
            /\/ordenes_tecnicas$/
        );

        await expect(
            ordenesPage.titulo
        ).toBeVisible();

        await expect(
            ordenesPage.mensajeInformativo
        ).toBeVisible();

        await expect(
            ordenesPage.searchInput
        ).toBeVisible();

        await expect(
            ordenesPage.tablaOrdenes
        ).toBeVisible();
    });

    test('Debe cargar las órdenes técnicas registradas', async ({
        page
    }) => {
        const ordenesPage =
            new OrdenesTecnicasPage(page);

        await ordenesPage.abrirDesdeMenu();
        await ordenesPage.esperarCargaDeTabla();

        const cantidadFilas =
            await ordenesPage.cantidadDeFilas();

        expect(cantidadFilas).toBeGreaterThan(0);
    });

});