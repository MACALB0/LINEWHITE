class OrdenesTecnicasPage {
    constructor(page) {
        this.page = page;

        this.menuOrdenesTecnicas = page.locator(
            'a[href="/ordenes_tecnicas"]'
        );

        this.titulo = page.getByRole('heading', {
            name: 'Órdenes técnicas'
        });

        this.mensajeInformativo = page.getByText(
            'Se muestran las órdenes técnicas registradas.'
        );

        this.searchInput = page.locator(
            '#search-ordenes'
        );

        this.tablaOrdenes = page.locator(
            '#tabla-ordenes'
        );

        this.filasOrdenes = page.locator(
            '#tabla-ordenes .tabulator-row'
        );
    }

    async abrirDesdeMenu() {
        await this.menuOrdenesTecnicas.waitFor({
            state: 'visible',
            timeout: 15_000
        });

        await Promise.all([
            this.page.waitForURL(
                '**/ordenes_tecnicas',
                {
                    timeout: 30_000,
                    waitUntil: 'domcontentloaded'
                }
            ),
            this.menuOrdenesTecnicas.click()
        ]);
    }

    async esperarCargaDeTabla() {
        await this.tablaOrdenes.waitFor({
            state: 'visible',
            timeout: 15_000
        });

        await this.page.waitForFunction(() => {
            const tabla = document.querySelector(
                '#tabla-ordenes'
            );

            return (
                tabla &&
                tabla.querySelectorAll(
                    '.tabulator-row'
                ).length > 0
            );
        }, null, {
            timeout: 15_000
        });
    }

    async cantidadDeFilas() {
        return this.filasOrdenes.count();
    }
}

module.exports = {
    OrdenesTecnicasPage
};