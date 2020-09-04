const db = require("../dal/models");
const Medicion = db.mediciones;


// Busca una Medición por ID
exports.findOne = (req, res) => {
    
    const id = req.params.id;
    
    Medicion.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message: "Error obteniendo Medición con id=" + id
        });
    });
  };