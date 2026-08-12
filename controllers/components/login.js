// login.js no va, se cambio a passport
const { request, response } = require('express');

/* Llama a login.pug*/
const code_login = async (
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

    return res.redirect('/');
};

module.exports = {
    code_login
}