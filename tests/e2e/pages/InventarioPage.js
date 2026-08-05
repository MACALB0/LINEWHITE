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
    }

    async abrirDesdeMenu() {
        await this.menuInventario.waitFor({
            state: 'visible',
            timeout: 15_000
        });

        await Promise.all([
            this.page.waitForURL(
                '**/inventario',
                {
                    timeout: 30_000,
                    waitUntil: 'domcontentloaded'
                }
            ),
            this.menuInventario.click()
        ]);
    }

    async esperarCargaDeTabla() {
        await this.tablaProductos.waitFor({
            state: 'visible',
            timeout: 15_000
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