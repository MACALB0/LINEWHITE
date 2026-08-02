const express = require('express');
const router = express.Router();

/* Llama a login.pug*/
const code_vista_index = async (req = request, res = response) => {
    res.render('secciones/vista_dashboard', {breadcrumb_name: 'Dashboard'});
}
module.exports = {
    code_vista_index
}