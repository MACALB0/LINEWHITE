const {
    code_vista_index
} = require('../../controllers/components/vista_index');

const {
    code_vista_facturas
} = require('../../controllers/components/vista_facturas');

const {
    code_vista_inventario
} = require('../../controllers/components/vista_inventario');

const {
    code_vista_ordenes_tecnicas
} = require('../../controllers/components/vista_ordenes_tecnicas');

const {
    code_vista_usuarios
} = require('../../controllers/components/vista_usuarios');

describe('Controladores de vistas', () => {

    function crearReq(tipoUsuario) {
        return {
            session: {
                usuario: {
                    id_tipo_usuario: tipoUsuario
                }
            }
        };
    }

    function crearRes() {
        return {
            render: jest.fn(),
            redirect: jest.fn()
        };
    }

    describe('Vista Dashboard', () => {

        test('Debe permitir acceso al tipo 0', async () => {
            const req = crearReq(0);
            const res = crearRes();

            await code_vista_index(req, res);

            expect(res.render).toHaveBeenCalledWith(
                'secciones/vista_dashboard',
                {
                    breadcrumb_name: 'Dashboard'
                }
            );
        });

        test('Debe redirigir un usuario no autorizado', async () => {
            const req = crearReq(2);
            const res = crearRes();

            await code_vista_index(req, res);

            expect(res.redirect).toHaveBeenCalledWith('/');
        });

    });

    describe('Vista Facturas', () => {

        test('Debe permitir acceso al tipo 1', async () => {
            const req = crearReq(1);
            const res = crearRes();

            await code_vista_facturas(req, res);

            expect(res.render).toHaveBeenCalledWith(
                'secciones/vista_facturas',
                {
                    breadcrumb_name: 'Facturas'
                }
            );
        });

        test('Debe redirigir un usuario no autorizado', async () => {
            const req = crearReq(5);
            const res = crearRes();

            await code_vista_facturas(req, res);

            expect(res.redirect).toHaveBeenCalledWith('/');
        });

    });

    describe('Vista Inventario', () => {

        test('Debe permitir acceso al tipo 0', async () => {
            const req = crearReq(0);
            const res = crearRes();

            await code_vista_inventario(req, res);

            expect(res.render).toHaveBeenCalledWith(
                'secciones/vista_inventario',
                {
                    breadcrumb_name: 'Inventario'
                }
            );
        });

        test('Debe redirigir un usuario no autorizado', async () => {
            const req = crearReq(3);
            const res = crearRes();

            await code_vista_inventario(req, res);

            expect(res.redirect).toHaveBeenCalledWith('/');
        });

    });

    describe('Vista Órdenes Técnicas', () => {

        test('Debe permitir acceso al tipo 1', async () => {
            const req = crearReq(1);
            const res = crearRes();

            await code_vista_ordenes_tecnicas(req, res);

            expect(res.render).toHaveBeenCalledWith(
                'secciones/vista_ordenes_tecnicas',
                {
                    breadcrumb_name: 'Ordenes Técnicas'
                }
            );
        });

        test('Debe redirigir un usuario no autorizado', async () => {
            const req = crearReq(8);
            const res = crearRes();

            await code_vista_ordenes_tecnicas(req, res);

            expect(res.redirect).toHaveBeenCalledWith('/');
        });

    });

    describe('Vista Usuarios', () => {

        test('Debe permitir acceso al tipo 0', async () => {
            const req = crearReq(0);
            const res = crearRes();

            await code_vista_usuarios(req, res);

            expect(res.render).toHaveBeenCalledWith(
                'secciones/vista_usuarios',
                {
                    breadcrumb_name: 'Usuarios'
                }
            );
        });

        test('Debe redirigir un usuario no autorizado', async () => {
            const req = crearReq(9);
            const res = crearRes();

            await code_vista_usuarios(req, res);

            expect(res.redirect).toHaveBeenCalledWith('/');
        });

    });

});