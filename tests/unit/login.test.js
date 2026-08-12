const { code_login } = require('../../controllers/components/login');
const { code_vista_login } = require('../../controllers/components/vista_login');


describe('Login Controller Tests', () => {

    describe('code_login', () => {

        test('should redirect user to index page when there is no valid session', async () => {

            const req = {};

            const res = {
                redirect: jest.fn(),
                render: jest.fn()
            };

            await code_login(req, res);

            expect(res.redirect)
                .toHaveBeenCalledWith('/');

            expect(res.render)
                .not.toHaveBeenCalled();

        });


        test('should render dashboard for user type 0', async () => {

            const req = {
                session: {
                    usuario: {
                        id_tipo_usuario: 0
                    }
                }
            };

            const res = {
                redirect: jest.fn(),
                render: jest.fn()
            };

            await code_login(req, res);

            expect(res.render)
                .toHaveBeenCalledWith(
                    'secciones/vista_dashboard',
                    {
                        breadcrumb_name: 'Dashboard'
                    }
                );

            expect(res.redirect)
                .not.toHaveBeenCalled();

        });


        test('should render dashboard for user type 1', async () => {

            const req = {
                session: {
                    usuario: {
                        id_tipo_usuario: 1
                    }
                }
            };

            const res = {
                redirect: jest.fn(),
                render: jest.fn()
            };

            await code_login(req, res);

            expect(res.render)
                .toHaveBeenCalledWith(
                    'secciones/vista_dashboard',
                    {
                        breadcrumb_name: 'Dashboard'
                    }
                );

            expect(res.redirect)
                .not.toHaveBeenCalled();

        });

    });


    describe('code_vista_login', () => {

        test('should render login view when there is no valid session', async () => {

            const req = {};

            const res = {
                redirect: jest.fn(),
                render: jest.fn()
            };

            await code_vista_login(req, res);

            expect(res.render)
                .toHaveBeenCalledWith('login/vista_login');

            expect(res.redirect)
                .not.toHaveBeenCalled();

        });


        test('should render dashboard for user type 0', async () => {

            const req = {
                session: {
                    usuario: {
                        id_tipo_usuario: 0
                    }
                }
            };

            const res = {
                redirect: jest.fn(),
                render: jest.fn()
            };

            await code_vista_login(req, res);

            expect(res.render)
                .toHaveBeenCalledWith(
                    'secciones/vista_dashboard',
                    {
                        breadcrumb_name: 'Dashboard'
                    }
                );

            expect(res.redirect)
                .not.toHaveBeenCalled();

        });


        test('should render dashboard for user type 1', async () => {

            const req = {
                session: {
                    usuario: {
                        id_tipo_usuario: 1
                    }
                }
            };

            const res = {
                redirect: jest.fn(),
                render: jest.fn()
            };

            await code_vista_login(req, res);

            expect(res.render)
                .toHaveBeenCalledWith(
                    'secciones/vista_dashboard',
                    {
                        breadcrumb_name: 'Dashboard'
                    }
                );

            expect(res.redirect)
                .not.toHaveBeenCalled();

        });

    });

});
