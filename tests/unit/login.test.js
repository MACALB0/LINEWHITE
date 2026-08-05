// login.test.js
const { code_login } = require('../../controllers/components/login');
const { code_vista_login } = require('../../controllers/components/vista_login');


describe('Login Controller Tests', () => {

    test('should redirect user to index page', async () => {

        const req = {};

        const res = {
            redirect: jest.fn()
        };

        await code_login(req, res);

        expect(res.redirect)
            .toHaveBeenCalledWith('/index');

    });


    test('should render login view correctly', async () => {

        const req = {};

        const res = {
            render: jest.fn()
        };

        await code_vista_login(req, res);

        expect(res.render)
            .toHaveBeenCalledWith('login/vista_login');

    });


});