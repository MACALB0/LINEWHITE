const { test, expect } = require('@playwright/test');

test.describe('Disponibilidad de la aplicación', () => {

    test('Debe mostrar la página de inicio de sesión', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveURL(/\/$/);

        await expect(page.locator('body')).toBeVisible();
    });

});