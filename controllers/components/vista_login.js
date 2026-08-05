// vista_login.js
const express = require('express');
const router = express.Router();

/* Llama a login.pug*/
const code_vista_login = async (req = request, res = response) => {
    res.render('login/vista_login');
}
module.exports = {
    code_vista_login
}