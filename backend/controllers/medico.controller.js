const db = require("../dal/models");
const Medico = db.medicos;
const Op = db.Sequelize.Op;


// Crea un nuevo Medico o Colaborador (diferente rol)
exports.create = (req, res) => {    

    const medico = { 
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        password: req.body.password,
        sexo: req.body.sexo,
        telefono: req.body.telefono,
        servicio_unidad: req.body.servicio_unidad,
        num_colegiado: req.body.num_colegiado,
        centro: req.body.centro,
        deBaja: 0,                          // por defecto
        rol: req.body.rol
    };

    Medico.create(medico)
    .then(med => {
      req.body.hospitales.forEach(function(hospital) {
        
        //Añadimos cada hospital seleccionado a la tabla HospitalMedico
        med.addHospitale(hospital.id , med.id);

      });
      res.send(med);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Algún error ocurrió mientras se creaba un Medico."
        });
    });

};

// Obtiene todos los Medicos y Colaboradores (no dados de baja)
exports.getMedicosHabilitados = (req, res) => {
  
    Medico.findAll({ where: { deBaja: false } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algún error ocurrió mientras se obtenían los médicos."
        });
      });
};

// Obtiene únicamente los Médicos (no Colaboradores)
exports.getOnlyMedicos = (req, res) => {

  Medico.findAll({ where: { deBaja: false, rol: 'ADMIN' }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error ocurrió mientras se obtenían los médicos."
      });
    });
};

// Obtiene todos los Medicos y Colaboradores (dados de baja)
exports.getMedicosInhabilitados = (req, res) => {

  Medico.findAll({ where: { deBaja: true}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error ocurrió mientras se obtenían los médicos dados de baja."
      });
    });
};

// Obtiene todos los Pacientes de un Medico que NO están dados de baja
exports.getPacientesByMedico = (req, res) => {

  const id = req.params.id;
  
  db.pacientes.findAll(
    { 
      include: [
        {
          model: db.medicos,
          where: { id: id },
        }
      ],
      where: {   
        deBaja: false 
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error ocurrió mientras se buscaban los pacientes de un médico."
      });
    });
};

// Obtiene todos los Pacientes de un Medico que SI están dados de baja
exports.getPacientesDeBajaByMedico = (req, res) => {

  const id = req.params.id;
  
  db.pacientes.findAll(
    { 
      include: [
        {
          model: db.medicos,
          where: { id: id },
        }
      ],
      where: {   
        deBaja: true 
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error ocurrió mientras se buscaban los pacientes de un médico."
      });
    });
};

// Busca un Medico por ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Medico.findByPk(id)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message: "Algún error ocurrió mientras se buscaba un Medico with id=" + id
        });
    });
};

// Actualiza un Medico por ID
exports.update = (req, res) => {
    
  const id = req.params.id;

    Medico.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            msg: 'Medico modificado correctamente',
          });
        }else {
          Medico.findByPk(id)
            .then(medico => {
              
              if( !medico ){
                return res.status(404).json({
                  msg: `No se puede actualizar porque no existe medico con id=${id}.`
                });
              }

              res.status(400).json({
                msg: `No se puede actualizar el medico con id=${id}. El body de la petición no es correcto.`
              });

            })
            .catch(err => {

              res.status(500).json({
                msg: "Error actualizando médico con id: " + id
              });

            })
        }
      })
      .catch(err => {
        res.status(500).send({
          msg: err ||"Algún error ocurrió mientras se actualizaba el Medico con id=" + id
        });
      });
};

// Elimina un Medico por ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Medico.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Médico borrado correctamente"
          });
        } else {
          res.send({
            message: 'Algún error ocurrió mientras se borraba el médico'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: 'No se pudo borrar el médico'
        });
      });
};
