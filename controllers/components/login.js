const express = require('express');
const router = express.Router();

/* Llama a login.pug*/
const code_login = async (req = request, res = response) => {
    // res.render('vista_index');
    res.redirect('/index')
}
module.exports = {
    code_login
}