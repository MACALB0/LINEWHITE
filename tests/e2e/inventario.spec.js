const {
    test,
    expect
} = require('@playwright/test');

const {
    InventarioPage
} = require('./pages/InventarioPage');

const {
    autenticarUsuario
} = require('./fixtures/auth');

const {
    usuarios
} = require('../../test-data/usuarios');

test.describe('Flujo de gestión de inventario', () => {

    test.beforeEach(async ({ page }) => {
        // E2E de inventario requiere credenciales configuradas en el entorno CI.
        // Sin E2E_USERNAME y E2E_PASSWORD no es posible autenticar al usuario.
        test.skip(
            !usuarios.valido.usuario ||
            !usuarios.valido.contrasena,
            'Se requieren E2E_USERNAME y E2E_PASSWORD'
        );

        await autenticarUsuario(page);
    });

    test('Debe acceder al módulo de inventario desde el menú', async ({
        page
    }) => {
        const inventarioPage =
            new InventarioPage(page);

        await inventarioPage.abrirDesdeMenu();

        await expect(page).toHaveURL(
            /\/inventario$/
        );

        await expect(
            inventarioPage.titulo
        ).toBeVisible();

        await expect(
            inventarioPage.mensajeInformativo
        ).toBeVisible();

        await expect(
            inventarioPage.searchInput
        ).toBeVisible();

        await expect(
            inventarioPage.botonAnadir
        ).toBeVisible();
    });

    test('Debe cargar los productos registrados en la tabla', async ({
        page
    }) => {
        const inventarioPage =
            new InventarioPage(page);

        await inventarioPage.abrirDesdeMenu();

        await inventarioPage.esperarCargaDeTabla();

        const cantidadFilas =
            await inventarioPage.cantidadDeFilas();

        expect(cantidadFilas).toBeGreaterThan(0);
    });

    test('Debe abrir el modal para añadir un producto', async ({
        page
    }) => {
        const inventarioPage =
            new InventarioPage(page);

        await inventarioPage.abrirDesdeMenu();

        await inventarioPage.abrirModalAnadir();

        await expect(
            inventarioPage.modalAnadir
        ).toBeVisible();
    });

});