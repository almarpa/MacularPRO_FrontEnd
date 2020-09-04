const db = require("../dal/models");
const Escaner = db.escaneres;


// Busca un Escáner por ID
exports.findOne = (req, res) => {
    
    const id = req.params.id;
    
    Escaner.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message: "Error obteniendo escáner de retina con id=" + id
        });
    });
  };