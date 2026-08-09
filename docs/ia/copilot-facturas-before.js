const { test, expect } = require('@playwright/test');
const { FacturasPage } = require('../../e2e/pages/FacturasPage');

/*
 * Si tu proyecto ya tiene un helper de autenticación compartido,
 * reemplace esta función por ese helper para reutilizar el flujo existente.
 */
async function authenticateUser(page) {
    const email = process.env.PLAYWRIGHT_USER_EMAIL || 'admin@example.com';
    const password = process.env.PLAYWRIGHT_USER_PASSWORD || 'password123';

    await page.goto('/login');

    await page.getByLabel(/email|correo/i).fill(email);
    await page.getByLabel(/password|contraseña/i).fill(password);

    await page
        .getByRole('button', {
            name: /iniciar sesión|login|entrar/i
        })
        .click();

    await page.waitForURL('**/dashboard', { waitUntil: 'domcontentloaded' });
}

test.describe('Facturas', () => {
    test('debe abrir el módulo de facturas y mostrar la tabla con al menos una fila', async ({ page }) => {
        await authenticateUser(page);

        const facturasPage = new FacturasPage(page);

        await facturasPage.openFromSidebar();
        await facturasPage.verifyPageLoaded();
        await facturasPage.verifyTableVisible();

        const rowCount = await facturasPage.filasFacturas.count();
        expect(rowCount).toBeGreaterThan(0);
    });
});