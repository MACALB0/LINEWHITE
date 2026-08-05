const usuarios = {
    valido: {
        usuario: (
            process.env.E2E_USERNAME || ''
        ).trim(),

        contrasena: (
            process.env.E2E_PASSWORD || ''
        ).trim()
    },

    inexistente: {
        usuario: 'usuario_qa_inexistente',
        contrasena: 'ClaveIncorrecta123'
    },

    contrasenaIncorrecta: {
        usuario: (
            process.env.E2E_USERNAME ||
            'usuario_existente'
        ).trim(),

        contrasena: 'ClaveTotalmenteIncorrecta123'
    }
};

module.exports = {
    usuarios
};