const express = require('express');
const router = express.Router();

/* Llama a login.pug*/
const code_vista_inventario = async (req = request, res = response) => {
    res.render('secciones/vista_inventario', {breadcrumb_name: 'Inventario'});
}
module.exports = {
    code_vista_inventario
}