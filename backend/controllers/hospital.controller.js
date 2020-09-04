const db = require("../dal/models");
const Hospital = db.hospitales;
const Op = db.Sequelize.Op;

// Crea un nuevo Hospital
exports.create = (req, res) => {

    const hospital = {
        nombre: req.body.nombre,
        ciudad: req.body.ciudad,
        telefono: req.body.telefono,
        url: req.body.url
    };
    
    Hospital.create(hospital)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating the Hospital."
        });
    });
};

// Obtiene todos los Hospitales
exports.get = (req, res) => {
    const title = req.query.title;
  
    Hospital.findAll()
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

// Obtiene todos los Hospitales que contengan cierto término
exports.getByTerm = (req, res) => {

  Hospital.findAll({where: { nombre: { [Op.substring]: '%'+ req.params.termino }}})
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

// Busca un Hospital por ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Hospital.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message: "Error retrieving Hospital with id=" + id
        });
    });
};

// Obtiene todos los Médicos de un Hospital
exports.getMedicosByHospital = (req, res) => {

  const id = req.params.id;
  
  db.medicos.findAll({ 
      where: {
        deBaja: false
      },
      include: [
        {
          model: db.hospitales,
          where: { id: id },
          as: 'Hospitales',
        }
      ]
    })
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error mientras se obtenían los médicos del hospital."
      });
    });
};

// Actualiza un Hospital por ID
exports.update = (req, res) => {
    const id = req.params.id;

    Hospital.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Hospital was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Hospital with id=${id}. Maybe Hospital was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Hospital with id=" + id
        });
      });
};

// Elimina un Hospital por ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Hospital.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Hospital was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Hospital was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Hospital with id=" + id
        });
      });
};

