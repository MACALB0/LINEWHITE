const code_vista_login = async (req, res) => {
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
};