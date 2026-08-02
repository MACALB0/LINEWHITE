const { code_vista_inventario } = require('../../controllers/components/vista_inventario');


describe('Inventario Controller Tests', () => {


    test('should render inventory view correctly', async () => {

        const req = {};

        const res = {
            render: jest.fn()
        };


        await code_vista_inventario(req, res);


        expect(res.render)
            .toHaveBeenCalledWith(
                'secciones/vista_inventario',
                {
                    breadcrumb_name: 'Inventario'
                }
            );

    });


    test('should call render exactly once', async () => {

        const req = {};

        const res = {
            render: jest.fn()
        };


        await code_vista_inventario(req, res);


        expect(res.render)
            .toHaveBeenCalledTimes(1);

    });


});