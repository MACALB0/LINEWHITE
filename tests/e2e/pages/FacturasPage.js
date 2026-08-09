class FacturasPage {
    constructor(page) {
        this.page = page;

        /*
         * Se limita el selector al menú lateral para evitar
         * múltiples coincidencias con otros enlaces /facturas.
         */
        this.menuFacturas = page.locator(
            '#navigation a[href="/facturas"]'
        );

        /*
         * La vista actual muestra el título "Usuarios".
         * Se conserva así porque el Page Object debe reflejar
         * la implementación real y no una suposición.
         */
        this.titulo = page.getByRole('heading', {
            name: 'Usuarios'
        });

        this.searchInput = page.locator(
            '#search'
        );

        this.tablaFacturas = page.locator(
            '#tabla-usuarios'
        );

        this.filasFacturas = page.locator(
            '#tabla-usuarios .tabulator-row'
        );
    }

    async openFromSidebar() {
        await this.menuFacturas.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await Promise.all([
            this.page.waitForURL(
                '**/facturas',
                {
                    waitUntil: 'domcontentloaded'
                }
            ),
            this.menuFacturas.click()
        ]);
    }

    async verifyPageLoaded() {
        await this.page.waitForURL(
            '**/facturas',
            {
                waitUntil: 'domcontentloaded'
            }
        );

        await this.titulo.waitFor({
            state: 'visible'
        });

        await this.searchInput.waitFor({
            state: 'visible'
        });

        await this.tablaFacturas.waitFor({
            state: 'visible'
        });
    }

    async verifyTableVisible() {
        await this.tablaFacturas.waitFor({
            state: 'visible'
        });

        await this.page.waitForFunction(() => {
            const tabla =
                document.querySelector(
                    '#tabla-usuarios'
                );

            return (
                tabla &&
                tabla.querySelectorAll(
                    '.tabulator-row'
                ).length > 0
            );
        });
    }

    async rowCount() {
        return await this.filasFacturas.count();
    }
}

module.exports = {
    FacturasPage
};