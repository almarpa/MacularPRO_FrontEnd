const db = require("../dal/models");
const Anteced_Medico = db.anteced_medicos;
const Op = db.Sequelize.Op;

// Crea un nuevo Antecedente Médico
exports.create = (req, res) => {

    const antecedente_medico = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        resultado: req.body.resultado
    };
    
    Anteced_Medico.create(antecedente_medico)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating the Anteced_Medico."
        });
    });
};

// Obtiene todos los Antecedentes Médicos.
exports.get = (req, res) => {
    const title = req.query.title;
  
    Anteced_Medico.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

// Busca un Antececente Medico por ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Anteced_Medico.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message: "Error retrieving Anteced_Medico with id=" + id
        });
    });
};

// Actualiza un Antecedente Medico
exports.update = (req, res) => {
    const id = req.params.id;

    Anteced_Medico.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Anteced_Medico was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Anteced_Medico with id=${id}. Maybe Anteced_Medico was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Anteced_Medico with id=" + id
        });
      });
};

// Elimina un Antecedente Médico por ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Anteced_Medico.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Anteced_Medico was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Anteced_Medico with id=${id}. Maybe Anteced_Medico was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Anteced_Medico with id=" + id
        });
      });
};
