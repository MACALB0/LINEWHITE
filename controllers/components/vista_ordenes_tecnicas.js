const express = require('express');
const router = express.Router();

/* Llama a login.pug*/
const code_vista_ordenes_tecnicas = async (req = request, res = response) => {
    res.render('secciones/vista_ordenes_tecnicas', {breadcrumb_name: 'Ordenes Técnicas'});
}
module.exports = {
    code_vista_ordenes_tecnicas
}