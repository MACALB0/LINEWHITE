const { Router } = require('express');

const passport = require('passport');

const { autenticado } = require("../middlewares/auth");

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
router.get('/index', 
  autenticado,
  vista_index
);
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

router.post("/api/login", (req, res, next) => {

    console.log("Body:", req.body);

    passport.authenticate("local", (err, user, info) => {

        console.log("Error:", err);
        console.log("User:", user);
        console.log("Info:", info);

        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: info.message
            });
        }

        req.logIn(user, (err) => {

            console.log("Error logIn:", err);
            console.log("Usuario en sesión:", req.user);

            if (err) {
                return next(err);
            }

            return res.json({
                ok: true,
                message: "Usuario autenticado",
                user: {
                    id: user.id,
                    nombre: user.nombre,
                    apellidos: user.apellidos
                }
            });

        });

    })(req, res, next);

});

// router.post('/login', login);

// router.post('/api/login',
//     passport.authenticate('local',{
//         successRedirect:'/index',
//         failureRedirect:'/'
//     })

// );


// router.post("/api/login", (req, res, next) => {

//     passport.authenticate("local", (err, user, info) => {

//       console.log('err',err);

//         if (err) {
//             return next(err);
//         }


//         console.log('user',user);

//         if (!user) {
//             return res.status(401).json({
//                 success: false,
//                 message: info.message
//             });
//         }


//         req.logIn(user, (err) => {

//             if (err) {
//                 return next(err);
//             }


//             return res.json({
//                 ok: true,
//                 message: "Usuario autenticado",
//                 user: {
//                     id: user.id,
//                     nombre: user.nombre,
//                     apellidos: user.apellidos
//                 }
//             });

//         });


//     })(req, res, next);

// });

router.get("/api/logout", (req, res, next) => {

    req.logout(function(err) {

        if (err) {
            return next(err);
        }

        req.session.destroy((err) => {

            if (err) {
                console.error("Error destruyendo sesión:", err);
            }

            res.clearCookie("connect.sid");

            res.redirect("/");

        });

    });

});




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