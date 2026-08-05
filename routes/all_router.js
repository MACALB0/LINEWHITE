// all_router.js
const { Router } = require("express");

const passport = require("passport");

const { autenticado } = require("../middlewares/auth");

const {
  login,
  vista_facturas,
  vista_index,
  vista_inventario,
  vista_login,
  vista_ordenes_tecnicas,
  vista_usuarios,
} = require("../controllers/all_controllers");

// const { insertar } = require('../controllers/all_controllers');
const router = Router();

/*
=====================================================
Ruta de vista de iniciar sesion
=====================================================
Esta ruta dirige a la vista de inicio de session
=====================================================
*/
router.get("/", vista_login);
/*
=====================================================
Ruta de vista de facturas
=====================================================
Esta ruta dirige a la vista del facturas
=====================================================
*/
router.get("/facturas", autenticado, vista_facturas);
/*
=====================================================
Ruta de vista de index/dashboard
=====================================================
Esta ruta dirige a la vista del index/dashboard
=====================================================
*/
router.get("/index", autenticado, vista_index);
/*
=====================================================
Ruta de vista de inventario
=====================================================
Esta ruta dirige a la vista del inventario
=====================================================
*/
router.get("/inventario", autenticado, vista_inventario);
/*
=====================================================
Ruta de vista de inventario
=====================================================
Esta ruta dirige a la vista del inventario
=====================================================
*/
router.get("/ordenes_tecnicas", autenticado, vista_ordenes_tecnicas);
/*
=====================================================
Ruta de vista de inventario
=====================================================
Esta ruta dirige a la vista del inventario
=====================================================
*/
router.get("/usuarios", autenticado, vista_usuarios);
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
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info?.message || "Credenciales inválidas",
      });
    }

    req.logIn(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      req.session.usuario = user;

      req.session.save((sessionError) => {
        if (sessionError) {
          return next(sessionError);
        }

        return res.json({
          ok: true,
          message: "Usuario autenticado",
          user: {
            id: user.id,
            id_tipo_usuario: user.id_tipo_usuario,
            nombre: user.nombre,
            apellidos: user.apellidos,
          },
        });
      });
    });
  })(req, res, next);
});

// router.post("/api/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return next(err);
//     }

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: info?.message || "Credenciales inválidas",
//       });
//     }

//     req.logIn(user, (loginError) => {
//       if (loginError) {
//         return next(loginError);
//       }

//       req.session.usuario = user;

//       console.log("Usuario guardado en sesión:", req.session.usuario);

//       /*
//        * Esperamos a que la sesión quede guardada antes de
//        * responder. Así /index puede leer session.usuario.
//        */
//       req.session.save((sessionError) => {
//         if (sessionError) {
//           return next(sessionError);
//         }

//         return res.json({
//           ok: true,
//           message: "Usuario autenticado",
//           user: {
//             id: user.id,
//             id_tipo_usuario: user.id_tipo_usuario,
//             nombre: user.nombre,
//             apellidos: user.apellidos,
//           },
//         });
//       });
//     });
//   })(req, res, next);
// });

// router.post("/api/login", (req, res, next) => {

//     console.log("Body:", req.body);

//     passport.authenticate("local", (err, user, info) => {

//         console.log("Error:", err);
//         console.log("User:", user);
//         console.log("Info:", info);

//         if (err) {
//             return next(err);
//         }

//         if (!user) {
//             return res.status(401).json({
//                 success: false,
//                 message: info.message
//             });
//         }

//         req.logIn(user, (err) => {

//             console.log("Error logIn:", err);
//             console.log("Usuario en sesión:", req.user);

//             if (err) {
//                 return next(err);
//             }

//             req.session.usuario = user;

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

router.get("/api/logout", autenticado, (req, res, next) => {
  req.logout((logoutError) => {
    if (logoutError) {
      return next(logoutError);
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return next(sessionError);
      }

      res.clearCookie("connect.sid");

      return res.redirect("/");
    });
  });
});

// router.get("/api/logout",
//     autenticado,
//     (req, res, next) => {

//     req.logout(function(err) {

//         if (err) {
//             return next(err);
//         }

//         req.session.destroy((err) => {

//             if (err) {
//                 console.error("Error destruyendo sesión:", err);
//             }

//             res.clearCookie("connect.sid");

//             res.redirect("/");

//         });

//     });

// });

/* Esto es una prubea, sol opara cargar datos en tabulator */
router.get("/api/users", async (req, res) => {
  console.log("/api/users");

  res.json([
    {
      id: 1,
      name: "Juan",
      email: "juan@test.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Maria",
      email: "maria@test.com",
      role: "Editor",
    },
  ]);
});

module.exports = router;
