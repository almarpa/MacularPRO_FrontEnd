var db = require("../dal/models");
var jwt = require('jsonwebtoken');

const Medico = db.medicos;
const Op = db.Sequelize.Op;


// Login de usuario
exports.autenticate = (req, res) => {
  
    var body = req.body;
    
    Medico.findOne({ where: { correo: body.correo } })
        .then(usuarioMedico => {

            // Comprobar si el usuario es correcto
            if(!usuarioMedico) {
                return res.status(400).json({
                    msg: 'Usuario incorrecto',
                });
            }
            
            // Si la contraseña es incorrecta...
            if( body.password != usuarioMedico.password ){
                return res.status(400).json({
                    msg: 'Contraseña incorrecta',
                });
            }

            // Modificamos la contraseña para que no se vea
            usuarioMedico.password = ':)';

            // Almacena el usuario autenticado en la aplicación
            var token = jwt.sign({ usuario: usuarioMedico}, '@g-mac-seed');

            
            res.status(200).json({
            msg: 'Sesión iniciada correctamente',
            medico: usuarioMedico,
            token: token
            });

        })

        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Error al buscar usuario."
            });
        });
};

