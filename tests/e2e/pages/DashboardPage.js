class DashboardPage {
    constructor(page) {
        this.page = page;

        this.userMenuButton = page.locator(
            'a.nav-link.dropdown-toggle[data-bs-toggle="dropdown"]'
        );

        this.logoutButton = page.getByRole('link', {
            name: 'Sign out'
        });
    }

    async abrirMenuUsuario() {
        await this.userMenuButton.click();
    }

    async cerrarSesion() {
        await this.abrirMenuUsuario();

        await Promise.all([
            this.page.waitForURL('**/', {
                timeout: 30_000
            }),
            this.logoutButton.click()
        ]);
    }
}

module.exports = {
    DashboardPage
};