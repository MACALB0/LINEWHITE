const { request, response } = require('express');

const code_vista_usuarios = async (
    req = request,
    res = response
) => {
    const tipoUsuario = Number(
    req.session?.usuario?.id_tipo_usuario
);

    if (tipoUsuario === 0 || tipoUsuario === 1) {
        return res.render(
            'secciones/vista_usuarios',
            {
                breadcrumb_name: 'Usuarios'
            }
        );
    }

    return res.redirect('/');
};

module.exports = {
    code_vista_usuarios
};