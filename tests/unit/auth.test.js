const {
    autenticado
} = require('../../middlewares/auth');

describe('Middleware autenticado', () => {

    test('Debe permitir acceso cuando Passport confirma la autenticación', () => {
        const req = {
            isAuthenticated: jest
                .fn()
                .mockReturnValue(true),
            session: {}
        };

        const res = {
            redirect: jest.fn()
        };

        const next = jest.fn();

        autenticado(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(res.redirect).not.toHaveBeenCalled();
    });

    test('Debe permitir acceso cuando existe un usuario guardado en sesión', () => {
        const req = {
            isAuthenticated: jest
                .fn()
                .mockReturnValue(false),

            session: {
                usuario: {
                    id: 25,
                    id_tipo_usuario: 0
                }
            }
        };

        const res = {
            redirect: jest.fn()
        };

        const next = jest.fn();

        autenticado(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(res.redirect).not.toHaveBeenCalled();
    });

    test('Debe redirigir cuando Passport no autentica y no existe usuario en sesión', () => {
        const req = {
            isAuthenticated: jest
                .fn()
                .mockReturnValue(false),

            session: {}
        };

        const res = {
            redirect: jest.fn()
        };

        const next = jest.fn();

        autenticado(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith('/');
        expect(next).not.toHaveBeenCalled();
    });

    test('Debe redirigir cuando no existe isAuthenticated ni una sesión válida', () => {
        const req = {
            session: {}
        };

        const res = {
            redirect: jest.fn()
        };

        const next = jest.fn();

        autenticado(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith('/');
        expect(next).not.toHaveBeenCalled();
    });

    test('Debe consultar isAuthenticated una sola vez', () => {
        const req = {
            isAuthenticated: jest
                .fn()
                .mockReturnValue(true),

            session: {}
        };

        const res = {
            redirect: jest.fn()
        };

        const next = jest.fn();

        autenticado(req, res, next);

        expect(
            req.isAuthenticated
        ).toHaveBeenCalledTimes(1);
    });

});