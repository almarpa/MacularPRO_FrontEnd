const db = require("../dal/models");
const Op = db.Sequelize.Op;

// Busca un DatoAntropometrico por ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    db.dato_antropometricos.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message: "Error obteniendo dato antropométrico con id=" + id
        });
    });
};