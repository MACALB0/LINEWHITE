const express = require('express');
const router = express.Router();

/* Llama a login.pug*/
const code_vista_facturas = async (req = request, res = response) => {
    res.render('secciones/vista_facturas', {breadcrumb_name: 'Facturas'});
}
module.exports = {
    code_vista_facturas
}