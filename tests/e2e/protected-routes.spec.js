const { test, expect } = require('@playwright/test');

const {
    LoginPage
} = require('./pages/LoginPage');

test.describe('Protección de rutas', () => {

    test('Debe redirigir al login cuando se accede al dashboard sin sesión', async ({
        page
    }) => {
        const loginPage = new LoginPage(page);

        await page.goto('/index');

        await expect(page).toHaveURL(/\/$/);
        await expect(loginPage.loginButton).toBeVisible();
    });

});