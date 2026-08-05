//passport.js
const LocalStrategy = require("passport-local").Strategy;
const argon2 = require("argon2");
const pool = require("../DB/database");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "usuario",
        passwordField: "contrasena",
      },

      async (usuario, contrasena, done) => {
        try {
          const sql = `
                        SELECT *
                        FROM FN_CONSULTA_LOGIN($1)
                    `;

          const resultado = await pool.query(sql, [usuario]);

          if (resultado.rows.length === 0) {
            return done(null, false, {
              message: "Usuario no encontrado",
            });
          }

          console.log("Usuario recibido:", usuario);
          console.log("Resultado BD:", resultado.rows);

          const datos = resultado.rows[0];

          console.log("Datos usuario:", datos);
          console.log("Hash:", datos.password_hash);

          if (datos.res_respuesta !== "SI") {
            return done(null, false, {
              message: datos.res_respuesta_msg,
            });
          }

          const passwordValida = await argon2.verify(
            datos.password_hash,
            contrasena,
          );

          console.log("Password válida:", passwordValida);

          if (!passwordValida) {
            return done(null, false, {
              message: "Contraseña incorrecta",
            });
          }

          console.log(
            "id_tipo_usuario recibido:",
            datos.id_tipo_usuario,
            typeof datos.id_tipo_usuario,
          );

          // Este es el usuario que Passport guardará
          //   const user = datos;
          const user = {
            id: datos.id,
            id_tipo_usuario: Number(datos.id_tipo_usuario),
            cedula: datos.cedula,
            nombre: datos.nombre,
            apellidos: datos.apellidos,
          };

          return done(null, user);
        } catch (error) {
          console.error(error);

          return done(error);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    console.log("SERIALIZE", user);
    done(null, user.id);
  });

  // passport.deserializeUser(async (id, done) => {
  //   try {
  //     const sql = `
  //               SELECT *
  //               FROM FN_CONSULTA_LOGIN_SESION($1)
  //           `;

  //     const resultado = await pool.query(sql, [id]);

  //     if (resultado.rows.length === 0) {
  //       return done(null, false);
  //     }

  //     console.log("DESSERIALIZE", resultado.rows[0]);

  //     done(null, resultado.rows[0]);
  //   } catch (error) {
  //     done(error);
  //   }
  // });
//   passport.deserializeUser(async (id, done) => {
//     try {
//         const sql = `
//             SELECT *
//             FROM FN_CONSULTA_LOGIN_SESION($1)
//         `;

//         const resultado = await pool.query(sql, [id]);

//         if (resultado.rows.length === 0) {
//             return done(null, false);
//         }

//         const datos = resultado.rows[0];

//         const user = {
//             id: datos.id,
//             id_tipo_usuario: Number(datos.id_tipo_usuario),
//             cedula: datos.cedula,
//             nombre: datos.nombre,
//             apellidos: datos.apellidos
//         };

//         console.log('Usuario deserializado:', user);

//         return done(null, user);
//     } catch (error) {
//         return done(error);
//     }
// });

passport.deserializeUser(async (id, done) => {
    try {
        const sql = `
            SELECT *
            FROM FN_CONSULTA_LOGIN_SESION($1)
        `;

        const resultado = await pool.query(sql, [id]);

        if (resultado.rows.length === 0) {
            return done(null, false);
        }

        const datos = resultado.rows[0];

        /*
         * La función devuelve una fila con RES_RESPUESTA = NO
         * cuando el usuario no existe.
         */
        if (datos.res_respuesta !== 'SI') {
            return done(null, false);
        }

        const user = {
            id: datos.id,
            id_tipo_usuario: Number(
                datos.id_tipo_usuario
            ),
            cedula: datos.cedula,
            nombre: datos.nombre,
            apellidos: datos.apellidos
        };

        return done(null, user);

    } catch (error) {
        return done(error);
    }
});

};
