class LoginPage {
    constructor(page) {
        this.page = page;

        this.usuarioInput = page.locator('#usuario');
        this.contrasenaInput = page.locator('#contrasena');
        this.loginButton = page.locator('#btn_login');

        this.logo = page.getByAltText(
            'Line White Services'
        );

        this.title = page.getByRole(
            'heading',
            {
                name: 'Bienvenido a:'
            }
        );
    }

    async visitar() {
        await this.page.goto('/');
    }

    async completarCredenciales(usuario, contrasena) {
        await this.usuarioInput.fill(usuario);
        await this.contrasenaInput.fill(contrasena);
    }

    async iniciarSesion(usuario, contrasena) {
        await this.completarCredenciales(
            usuario,
            contrasena
        );

        await this.loginButton.click();
    }

    async hacerClicEnIniciarSesion() {
        await this.loginButton.click();
    }

    async obtenerUsuario() {
        return this.usuarioInput.inputValue();
    }

    async obtenerContrasena() {
        return this.contrasenaInput.inputValue();
    }

    async estaVisible() {
        return this.loginButton.isVisible();
    }

    async esperarRedireccionAlDashboard() {
        await this.page.waitForURL(
            '**/index',
            {
                timeout: 30_000
            }
        );
    }
}

module.exports = {
    LoginPage
};