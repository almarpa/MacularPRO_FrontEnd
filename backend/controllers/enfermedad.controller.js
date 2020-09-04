const db = require("../dal/models");
const Op = db.Sequelize.Op;


// Busca una Enfermedad por ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    db.enfermedades.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message: "Error obteniendo enfermedad con id=" + id
        });
    });
};