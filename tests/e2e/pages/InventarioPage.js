class InventarioPage {
    constructor(page) {
        this.page = page;

        this.menuInventario = page.locator(
            'a[href="/inventario"]'
        );

        this.titulo = page.getByRole('heading', {
            name: 'Productos en inventario'
        });

        this.mensajeInformativo = page.getByText(
            'Se muestran todos los productos que se han registrado.'
        );

        this.searchInput = page.locator('#search');

        this.tablaProductos = page.locator(
            '#tabla-productos'
        );

        this.filasProductos = page.locator(
            '#tabla-productos .tabulator-row'
        );

        this.botonAnadir = page.getByRole('button', {
            name: /Añadir/i
        });

        this.modalAnadir = page.locator(
            '#exampleModal'
        );

        this.sidebarToggle = page.locator(
            '[data-lte-toggle="sidebar"]'
        );
    }

    // async abrirDesdeMenu() {
    //     // await this.menuInventario.waitFor({
    //     //     state: 'visible',
    //     //     timeout: 15_000
    //     // });

    //     // Si Inventario no está visible, el sidebar está colapsado.
    //     if (!(await this.menuInventario.isVisible())) {

    //         await this.sidebarToggle.waitFor({
    //             state: 'visible',
    //             timeout: 60_000
    //         });

    //         await this.sidebarToggle.click();

    //         await this.menuInventario.waitFor({
    //             state: 'visible',
    //             timeout: 60_000
    //         });
    //     }

    //     await Promise.all([
    //         this.page.waitForURL(
    //             '**/inventario',
    //             {
    //                 timeout: 60_000,
    //                 waitUntil: 'domcontentloaded'
    //             }
    //         ),
    //         this.menuInventario.click()
    //     ]);
    // }

//     async abrirDesdeMenu() {

//     // Si Inventario no está visible, el sidebar está colapsado.
//     if (!(await this.menuInventario.isVisible())) {

//         await this.sidebarToggle.waitFor({
//             state: 'visible',
//             timeout: 60_000
//         });

//         await this.sidebarToggle.click();

//         await this.menuInventario.waitFor({
//             state: 'visible',
//             timeout: 60_000
//         });
//     }

//     await Promise.all([
//         this.page.waitForURL(
//             '**/inventario',
//             {
//                 waitUntil: 'domcontentloaded',
//                 timeout: 60_000
//             }
//         ),

//         this.menuInventario.click()
//     ]);
// }

async abrirDesdeMenu() {

    // Comprobar si el enlace realmente está dentro del viewport.
    const inventarioEnViewport =
        await this.menuInventario.evaluate((element) => {

            const rect =
                element.getBoundingClientRect();

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <=
                    window.innerHeight &&
                rect.right <=
                    window.innerWidth
            );
        });

    // En móvil/tablet el sidebar está colapsado.
    if (!inventarioEnViewport) {

        await this.sidebarToggle
            .first()
            .waitFor({
                state: 'visible',
                timeout: 30_000
            });

        await this.sidebarToggle
            .first()
            .click();

        // Esperar hasta que Inventario entre realmente al viewport.
        await this.page.waitForFunction(() => {

            const element =
                document.querySelector(
                    'a[href="/inventario"]'
                );

            if (!element) {
                return false;
            }

            const rect =
                element.getBoundingClientRect();

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <=
                    window.innerHeight &&
                rect.right <=
                    window.innerWidth
            );

        }, {
            timeout: 30_000
        });
    }

    await Promise.all([

        this.page.waitForURL(
            '**/inventario',
            {
                waitUntil:
                    'domcontentloaded',
                timeout: 30_000
            }
        ),

        this.menuInventario.click()

    ]);
}

    async esperarCargaDeTabla() {
        await this.tablaProductos.waitFor({
            state: 'visible',
            timeout: 60_000
        });

        await this.page.waitForFunction(() => {
            const tabla = document.querySelector(
                '#tabla-productos'
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

    async abrirModalAnadir() {
        await this.botonAnadir.click();

        await this.modalAnadir.waitFor({
            state: 'visible',
            timeout: 10_000
        });
    }

    async cantidadDeFilas() {
        return this.filasProductos.count();
    }
}

module.exports = {
    InventarioPage
};