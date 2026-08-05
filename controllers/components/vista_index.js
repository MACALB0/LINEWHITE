// controllers/components/vista_index.js

const { request, response } = require('express');

const code_vista_index = async (
    req = request,
    res = response
) => {
    const tipoUsuario = Number(
        req.user?.id_tipo_usuario ??
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
    code_vista_index
};