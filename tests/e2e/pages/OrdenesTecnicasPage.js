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

        this.sidebarToggle = page.locator(
            '[data-lte-toggle="sidebar"]'
        );
    }

    // async abrirDesdeMenu() {
    //     await this.menuOrdenesTecnicas.waitFor({
    //         state: 'visible',
    //         timeout: 15_000
    //     });

    //     await Promise.all([
    //         this.page.waitForURL(
    //             '**/ordenes_tecnicas',
    //             {
    //                 timeout: 30_000,
    //                 waitUntil: 'domcontentloaded'
    //             }
    //         ),
    //         this.menuOrdenesTecnicas.click()
    //     ]);
    // }

    async abrirDesdeMenu() {

        const ordenesEnViewport =
            await this.menuOrdenesTecnicas.evaluate((element) => {

                const rect =
                    element.getBoundingClientRect();

                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= window.innerHeight &&
                    rect.right <= window.innerWidth
                );
            });

        // En móvil/tablet el sidebar está colapsado.
        if (!ordenesEnViewport) {

            await this.sidebarToggle
                .first()
                .waitFor({
                    state: 'visible',
                    timeout: 30_000
                });

            await this.sidebarToggle
                .first()
                .click();

            await this.page.waitForFunction(() => {

                const element =
                    document.querySelector(
                        'a[href="/ordenes_tecnicas"]'
                    );

                if (!element) {
                    return false;
                }

                const rect =
                    element.getBoundingClientRect();

                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= window.innerHeight &&
                    rect.right <= window.innerWidth
                );

            }, {
                timeout: 10_000
            });
        }

        await Promise.all([

            this.page.waitForURL(
                '**/ordenes_tecnicas',
                {
                    waitUntil: 'domcontentloaded',
                    timeout: 30_000
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