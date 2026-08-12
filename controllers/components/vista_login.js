// vista_login.js
const { request, response } = require('express');

/* Llama a login.pug*/
const code_vista_login = async (
    req = request,
    res = response
) => {
    const tipoUsuario = Number(
    req.session?.usuario?.id_tipo_usuario
);

    if (tipoUsuario === 0 || tipoUsuario === 1) {
        return res.render(
            'secciones/vista_dashboard',
            {
                breadcrumb_name: 'Dashboard'
            }
        );
    }

    return res.render('login/vista_login');
};

module.exports = {
    code_vista_login
}