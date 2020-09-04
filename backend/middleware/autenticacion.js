var jwt = require('jsonwebtoken');

// =====================
// Verificar token
// =====================
exports.verifyToken = function(req, res, next) {

    var token = req.query.token;

    // Verifica que el token es válido 
    jwt.verify( token, '@g-mac-seed', (err, decoded) => {
        
        if(err){

            return res.status(401).json({
                msg: 'No tiene permiso para realizar la operación, debe autenticarse en la aplicación',
                err: err
            });
            
        }

        // Guardamos el usuario-médico autenticado en la aplicación
        req.usuario = decoded.usuario;
        
        // Si es válido, sigue con la ejecución
        next();
    
    });

}

