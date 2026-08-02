const { Router } = require('express');
const oracledb = require('oracledb');

const passport = require('passport');

// Activa el modo thick del modulo oracledb
try {
    oracledb.initOracleClient({ libDir: process.PATH_CLIENT_ORACLE }); // AJUSTA la ruta según donde descomprimiste Oracle Instant Client
} catch (err) {
    console.error('Error al inicializar el cliente Oracle:', err);
}

const { login, vista_facturas, vista_index, vista_inventario, vista_login, vista_ordenes_tecnicas, vista_usuarios } = require('../controllers/all_controllers');

// const { insertar } = require('../controllers/all_controllers');
const router = Router();

/*
=====================================================
Ruta de vista de iniciar sesion
=====================================================
Esta ruta dirige a la vista de inicio de session
=====================================================
*/
router.get('/', vista_login);
/*
=====================================================
Ruta de vista de facturas
=====================================================
Esta ruta dirige a la vista del facturas
=====================================================
*/
router.get('/facturas', vista_facturas);
/*
=====================================================
Ruta de vista de index/dashboard
=====================================================
Esta ruta dirige a la vista del index/dashboard
=====================================================
*/
router.get('/index', vista_index);
/*
=====================================================
Ruta de vista de inventario
=====================================================
Esta ruta dirige a la vista del inventario
=====================================================
*/
router.get('/inventario', vista_inventario);
/*
=====================================================
Ruta de vista de inventario
=====================================================
Esta ruta dirige a la vista del inventario
=====================================================
*/
router.get('/ordenes_tecnicas', vista_ordenes_tecnicas);
/*
=====================================================
Ruta de vista de inventario
=====================================================
Esta ruta dirige a la vista del inventario
=====================================================
*/
router.get('/usuarios', vista_usuarios);
/*
=====================================================
Ruta de iniciar sesion
=====================================================
Esta ruta dirige al controlador de iniciar sesion 
donde se verifica si el usuario y contraseña son val-
lidos y se puede entrar o no al sistema
=====================================================
*/
// router.post('/login', login);

router.post('/login',

    passport.authenticate('local',{
        successRedirect:'/index',
        failureRedirect:'/'
    })

);




router.get('/api/users', async (req, res) => {

    console.log('/api/users');

  res.json(
    [
    {
      id: 1,
      name: 'Juan',
      email: 'juan@test.com',
      role: 'Admin'
    },
    {
      id: 2,
      name: 'Maria',
      email: 'maria@test.com',
      role: 'Editor'
    }
  ]
);

});



module.exports = router;