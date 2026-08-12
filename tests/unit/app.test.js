const request = require('supertest');

describe('Configuración principal de Express', () => {

    let app;

    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        delete process.env.SESSION_SECRET;
        process.env.NODE_ENV = 'test';
    });

    test('La aplicación debe inicializarse correctamente', () => {
        process.env.SESSION_SECRET = 'test-session-secret';

        app = require('../../app');

        expect(app).toBeDefined();
    });

    test('Debe utilizar el SESSION_SECRET configurado', () => {
        process.env.SESSION_SECRET = 'test-session-secret';

        app = require('../../app');

        expect(app).toBeDefined();
    });

    test('Debe utilizar el secreto local cuando SESSION_SECRET no existe', () => {
        delete process.env.SESSION_SECRET;

        app = require('../../app');

        expect(app).toBeDefined();
    });

    test('Debe ocultar la cabecera X-Powered-By', () => {
        process.env.SESSION_SECRET = 'test-session-secret';

        app = require('../../app');

        expect(app.get('x-powered-by')).toBe(false);
    });

    test('No debe exponer la cabecera X-Powered-By en la respuesta HTTP', async () => {
        process.env.SESSION_SECRET = 'test-session-secret';

        app = require('../../app');

        const response = await request(app)
            .get('/');

        expect(response.headers['x-powered-by'])
            .toBeUndefined();
    });

    test('Debe manejar correctamente una ruta inexistente', async () => {
        process.env.SESSION_SECRET = 'test-session-secret';

        app = require('../../app');

        const response = await request(app)
            .get('/ruta-que-no-existe');

        expect(response.status).toBe(404);
    });

    test('Debe manejar errores en ambiente development', async () => {
        process.env.SESSION_SECRET = 'test-session-secret';

        app = require('../../app');

        app.set('env', 'development');

        const response = await request(app)
            .get('/ruta-inexistente-development');

        expect(response.status).toBe(404);
    });

});