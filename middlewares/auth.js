// // auth.js
// function autenticado(req,res,next){

//     if(req.isAuthenticated()){
//         return next();
//     }

//     res.redirect("/");

// }


// module.exports={
//     autenticado
// }
// middlewares/auth.js

function autenticado(req, res, next) {
    const autenticadoPorPassport =
        typeof req.isAuthenticated === 'function' &&
        req.isAuthenticated();

    const usuarioGuardadoEnSesion =
        Boolean(req.session?.usuario);

    if (
        autenticadoPorPassport ||
        usuarioGuardadoEnSesion
    ) {
        return next();
    }

    return res.redirect('/');
}

module.exports = {
    autenticado
};