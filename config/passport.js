const LocalStrategy = require("passport-local").Strategy;
const pool = require("../DB/database");


module.exports = function(passport) {


    passport.use(
        new LocalStrategy(
            {
                usernameField: "usuario",
                passwordField: "contrasena"
            },

            async(usuario, contrasena, done)=>{

                try {


                    const sql = `
                        SELECT *
                        FROM FN_CONSULTA_LOGIN($1)
                    `;


                    const resultado = await pool.query(
                        sql,
                        [usuario]
                    );


                    console.log(resultado.rows);


                    if(resultado.rows.length === 0){

                        return done(null,false,{
                            message:"Usuario no encontrado"
                        });

                    }


                    const datos = resultado.rows[0];


                    /*
                     La función devuelve:
                     {
                        id: 1,
                        cedula:'123',
                        nombre:'Juan',
                        apellidos:'Perez',
                        res_respuesta:'SI',
                        res_respuesta_msg:'USUARIO AUTORIZADO'
                     }
                    */


                    if(datos.res_respuesta !== "SI"){

                        return done(null,false,{
                            message:datos.res_respuesta_msg
                        });

                    }


                    // Este es el usuario que Passport guardará
                    const user = datos;


                    return done(null,user);



                }catch(error){

                    console.error(error);

                    return done(error);

                }

            }
        )
    );



    passport.serializeUser((user,done)=>{


        console.log("SERIALIZE",user);


        done(null,user.id);



    });



    passport.deserializeUser(async(id,done)=>{


        try {


            const sql = `
                SELECT *
                FROM FN_CONSULTA_LOGIN($1)
            `;


            const resultado = await pool.query(
                sql,
                [id]
            );


            if(resultado.rows.length===0){

                return done(null,false);

            }


            done(null,resultado.rows[0]);



        }catch(error){

            done(error);

        }


    });


};













// const LocalStrategy = require("passport-local").Strategy;
// // const bcrypt = require('bcrypt');

// // const User = require('../models/user');

// const pool = require("../DB/database");

// module.exports = function (passport) {
//   passport.use(
//     new LocalStrategy(
//       {
//         usernameField: "usuario",
//         passwordField: "contrasena",
//       },

//       async (usuario, contrasena, done) => {
//         try {
//             console.log(usuario);
//             // console.log(usernameField);
//             console.log(contrasena);
//             // console.log(passwordField);
//           const sql = `
//             SELECT *
//             FROM FN_CONSULTA_LOGIN($1)
//         `;

//           const resultado = await pool.query(sql, [usuario]);

//         //   console.log(resultado.rows) ;

        
//         //   const user = await User.findByUsername(username);
//          const user = resultado.rows;

//           if (!user) {
//             return done(null, false);
//           }

//           // const match = await bcrypt.compare(
//           //     password,
//           //     user.password
//           // );

//           // if(!match){
//           //     return done(null, false);
//           // }

//           return done(null, user);
//         } catch (error) {
//           return done(error);
//         }
//       },
//     ),
//   );

//   passport.serializeUser((user, done) => {
//     done(null, user.id_usuario);
//   });

//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await User.findById(id);

//       done(null, user);
//     } catch (error) {
//       done(error);
//     }
//   });
// };
