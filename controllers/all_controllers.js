const components_login = require ('./components/login');
const components_vista_facturas = require ('./components/vista_facturas');
const components_vista_index = require ('./components/vista_index');
const components_vista_inventario = require ('./components/vista_inventario');
const components_vista_login = require ('./components/vista_login');
const components_vista_ordenes_tecnicas = require ('./components/vista_ordenes_tecnicas');
const components_vista_usuarios = require ('./components/vista_usuarios');

const login = components_login.code_login;
const vista_facturas = components_vista_facturas.code_vista_facturas;
const vista_index = components_vista_index.code_vista_index;
const vista_inventario = components_vista_inventario.code_vista_inventario;
const vista_login = components_vista_login.code_vista_login;
const vista_ordenes_tecnicas = components_vista_ordenes_tecnicas.code_vista_ordenes_tecnicas;
const vista_usuarios = components_vista_usuarios.code_vista_usuarios;


/* Exportarcion */
module.exports = {
    login,
    vista_facturas,
    vista_index,
    vista_inventario,
    vista_login,
    vista_usuarios,
    vista_ordenes_tecnicas
}