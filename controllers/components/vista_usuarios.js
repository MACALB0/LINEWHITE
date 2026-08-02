const express = require('express');
const router = express.Router();

/* Llama a login.pug*/
const code_vista_usuarios = async (req = request, res = response) => {
    res.render('secciones/vista_usuarios', {breadcrumb_name: 'Usuarios'});
}
module.exports = {
    code_vista_usuarios
}