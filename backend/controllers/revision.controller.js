const db = require("../dal/models");
const Revision = db.revisiones;

const Op = db.Sequelize.Op;

// Busca una Revision por ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  
  db.revisiones.findByPk(id)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
          message: "Error obteniendo revisión con id=" + id
      });
  });
};