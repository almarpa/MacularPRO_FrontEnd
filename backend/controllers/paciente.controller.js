const db = require("../dal/models");
const { Sequelize, pacientes } = require("../dal/models");
const Paciente = db.pacientes;
const Revision = db.revisiones;
const Escaner = db.escaneres;
const Medicion = db.mediciones;

const Op = db.Sequelize.Op;

// Crea un nuevo Paciente
exports.createPaciente = (req, res) => {
  
    const paciente = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        sip: req.body.sip,
        fecha_nac: req.body.fecha_nac,
        sexo: req.body.sexo,
        clase_econom: req.body.clase_econom,
        deBaja: 0,                          // por defecto
        MedicoId: req.body.medico.id
    };

    Paciente.create(paciente)
    .then(pac => {
        res.send(pac);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Algún error mientras se creaba el Paciente."
        });
    });
};

// Obtener todos los Pacientes habilitados
exports.get = (req, res) => {
  
    Paciente.findAll({ where: { deBaja: false}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algún error mientras se obtenían los Pacientes."
        });
      });
};

// Obtiene todos los Pacientes inhabilitados
exports.getPacientesDeBaja = (req, res) => {

  Paciente.findAll({ where: { deBaja: true}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error ocurrió mientras se obtenían los pacientes dados de baja."
      });
    });
};

// Obtiene todos los Pacientes registrados que contengan cierto término
exports.getAllByTerm = (req, res) => {

  Paciente.findAll(
    {
      where: Sequelize.and (
        { deBaja: false },
        Sequelize.or (
          { nombre: { [Op.substring]: '%'+ req.params.termino }},
          { apellidos: { [Op.substring]: '%'+ req.params.termino }},
          { sip: { [Op.substring]: '%'+ req.params.termino }}
        ),
      ),
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error mientras se obtenían los pacientes."
      });
    });
};

// Obtiene todos los Pacientes asociados al médico que contengan cierto término
exports.getAsocByTerm = (req, res) => {

  const id = req.params.id;

  Paciente.findAll(
    {
      where: 
        Sequelize.and (
          { deBaja: false },
          Sequelize.or (
            { nombre: { [Op.substring]: '%'+ req.params.termino }},
            { apellidos: { [Op.substring]: '%'+ req.params.termino }},
            { sip: { [Op.substring]: '%'+ req.params.termino }}
          ),
        ),
        
      include: [
        {
          model: db.medicos,
          where: { id: id },
        }
      ],
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error mientras se obtenían los pacientes."
      });
    });
};

// Obtiene un Paciente a partir de su ID
exports.getById = (req, res) => {

  const id = req.params.id;

  Paciente.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error obtenían Paciente with id= " + id
      });
    });
};

// Actualiza un Paciente por su ID
exports.update = (req, res) => {
    const id = req.params.id;
    console.log(req.body)
    Paciente.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Paciente was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Paciente with id=${id}. Maybe Paciente was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Paciente with id=" + id
        });
      });
};

// Elimina un Paciente por su ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Paciente.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Paciente was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Paciente was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Paciente with id=" + id
        });
      });
};

/**************************************
 *        ANTECEDENTES MÉDICOS
 *************************************/
// Obtiene todos antecedentes de un Paciente
exports.getAntecedentesByPaciente = (req, res) => {

  const id = req.params.id;

  db.anteced_medicos.findAll({ 
      include: [
        {
          model: db.pacientes,
          as: 'Pacientes',
          where: { id: id },
        }
      ]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error mientras se obtenían los antecedentes."
      });
    });
};

// Crea y añade un nuevo antecedente médico al paciente
exports.createAntecedente = (req, res) => {    

  antecedenteId = req.params.id;

  const antecedente = { 
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      resultado: req.body.resultado
  };

  db.anteced_medicos.create(antecedente)
    .then(ant => {
      //Añadimos el antecedente a la asociacion Paciente
      ant.setPacientes(antecedenteId);
      res.send(ant);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Algún error ocurrió mientras se creaba un antecedente."
        });
    });
};

// Actualiza un Antecedente por su ID
exports.updateAntecedente = (req, res) => {
  
  const idAntecedente = req.params.idAntecedente;
  
  db.anteced_medicos.update(req.body, {
    where: { id: idAntecedente }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Antecedente actualizado correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar el antecedente con ID=${idAntecedente}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando antecedente con ID=" + idAntecedente
      });
    });
};

// Elimina un antecedente por su ID
exports.deleteAntecedente = (req, res) => {
  const idAntecedente = req.params.idAntecedente;

  db.anteced_medicos.destroy({
    where: { id: idAntecedente }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Antecedente eliminado correctamente"
        });
      } else {
        res.send({
          message: `No se puede eliminar el antecedente con ID=${idAntecedente}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se ha podido eliminar antecedente con ID = " + idAntecedente
      });
    });
};

/**************************************
 *        ENFERMEDADES
 *************************************/
// Obtiene todas las Enfermedades de un Paciente
exports.getEnfermedadesByPaciente = (req, res) => {

  const id = req.params.id;
  
  db.enfermedades.findAll({ 
    include: [
      {
        model: db.pacientes,
        as: 'Pacientes',
        where: { id: id },
      }
    ]
    })
    .then(data => {
    res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error mientras se obtenían las enfermedades."
      });
    });
};

// Crea y añade una nueva enfermedad al paciente
exports.createEnfermedad = (req, res) => {    

  enfermedadId = req.params.id;

  const enfermedad = { 
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      fecha: req.body.fecha
  };

  db.enfermedades.create(enfermedad)
    .then(enf => {
      //Añadimos la enfermedad a la asociacion Paciente
      enf.setPacientes(enfermedadId);
      res.send(enf);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Algún error ocurrió mientras se creaba la enfermedad."
        });
    });
};

// Actualiza un Antecedente por su ID
exports.updateEnfermedad = (req, res) => {
  
  const idEnfermedad = req.params.idEnfermedad;
  
  db.enfermedades.update(req.body, {
    where: { id: idEnfermedad }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Enfermedad actualizada correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar la enfermedad con ID=${idEnfermedad}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando enfermedad con ID=" + idEnfermedad
      });
    });
};

// Elimina un antecedente por su ID
exports.deleteEnfermedad = (req, res) => {
  const idEnfermedad = req.params.idEnfermedad;

  db.enfermedades.destroy({
    where: { id: idEnfermedad }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Enfermead eliminada correctamente"
        });
      } else {
        res.send({
          message: `No se puede eliminar la enfermedad con ID=${idEnfermedad}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se ha podido eliminar enfermedad con ID = " + idAntecedente
      });
    });
};

/**************************************
 *        DATOS ANTROPOMÉTRICOS
 *************************************/
// Obtiene todos los Datos antropométricos de un Paciente
exports.getDatosAntropByPaciente = (req, res) => {

  const id = req.params.id;
  
  db.dato_antropometricos.findAll({ 
    include: [
      {
        model: db.pacientes,
        as: 'Pacientes',
        where: { id: id },
      }
    ]
    })
    .then(data => {
    res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error mientras se obtenían los datos."
      });
    });
};

// Crea y añade una nueva enfermedad al paciente
exports.createDato = (req, res) => {    

  id = req.params.id;

  const dato_antropometrico = { 
      fecha_creacion: req.body.fecha_creacion,
      obesidad: req.body.obesidad,
      peso: req.body.peso,
      perim_abdominal: req.body.perim_abdominal,
      imc: req.body.imc,
      altura: req.body.altura
  };

  db.dato_antropometricos.create(dato_antropometrico)
    .then(dato => {
      //Añadimos el dato antropométrico a la asociacion con el Paciente
      dato.setPacientes(id);
      res.send(dato);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Algún error ocurrió mientras se creaba el dato antropométrico."
        });
    });
};

// Actualiza una enfermedad por su ID
exports.updateDato = (req, res) => {
  
  const idDato = req.params.idDato;
  
  db.dato_antropometricos.update(req.body, {
    where: { id: idDato }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Dato antropométrico actualizado correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar el dato antropométrico con ID=${idDato}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando dato antropométrico con ID=" + idDato
      });
    });
};

// Elimina un dato antropométrico por su ID
exports.deleteDato = (req, res) => {
  const idDato = req.params.idDato;

  db.dato_antropometricos.destroy({
    where: { id: idDato }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Dato antropométrico eliminada correctamente"
        });
      } else {
        res.send({
          message: `No se puede eliminar el dato antropométrico con ID=${idDato}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se ha podido eliminar el dato con ID = " + idDato
      });
    });
};


/**************************************
 *        REVISIONES
 *************************************/
// Crea un nueva Revision a un paciente
exports.createRevision = (req, res) => {
  
  var medico = req.usuario;            // Médico autenticado en la aplicación
  const pacienteId = req.params.id;

  var ojo_revisado = req.body.ojo;

  var medicamentos = req.body.medicamentos;
  var coste_total = 0;
  var coste_acum = 0;

  //Calculamos el coste total y acumulado de los medicamentos de la revisión
  if( medicamentos != null) {
    for (var medicamento in medicamentos) {
      if(medicamentos[medicamento] == 'Bevacizumab') {
        coste_total += 500
      }else if(medicamentos[medicamento] == 'Ranibizumab'){
        coste_total += 500
      }else if(medicamentos[medicamento] == 'Aflibercept'){
        coste_total += 500
      }else {
        coste_total += 1000
        console.log(medicamento)
      }
    }
  }

  //Calculamos el coste acumulado de las revisiones
  db.revisiones.findAll({ 
    include: [{
        model: db.pacientes,
        where: { id: pacienteId}
      }]
    })
    .then(data => {
        // Si existe otra revisión anterior 
        if(data.length > 0){

            //Obtenemos el ultimo coste acumulado de todas las revisiones para ese paciente
            coste_acum = data[data.length - 1].coste_acum;
            //Añadimos al coste acumulado(de todas las revisiones) el coste de esta revisión (coste_total)
            coste_acum = coste_acum + coste_total;
        }

        // Definimos el objeto Revisión
        const revision = {
          fecha_revision: req.body.fecha_revision,
          motivo: req.body.motivo,
          observ: req.body.observ,
          coste_total: coste_total,
          coste_acum: coste_acum,
          MedicoId: medico.id,                  // le asignamos el ID del médico que crea la revisión
          PacienteId: pacienteId,                // le asignamos el ID del paciente revisado
        };

        console.log(db.revisiones.prototype)

        // Creamos la revisión tras calcular los costes asociados 
        Revision.create(revision)
          .then( rev => {
 
              // Buscamos si existe ya el Ojo revisado del paciente 
              // Comprobamos si el ojo revisado del paciente está ya registrado, para no crearlo de nuevo               
              db.pacientes.findByPk( pacienteId )
              .then(paciente => {
                  ojoExistente = false;
                  //Obtenemos los ojos del paciente
                  paciente.getOjos().then(ojos => {
                      for( var ojo in ojos) {
                          if(ojos[ojo].ojo_revision == ojo_revisado){
                              ojoExistente = true;
                              //Le asignamos el ojo existente a la revisión
                              rev.addOjo(ojos[ojo]);
                          }
                      }
                      // Si no existe creamos el ojo y lo asociamos a la revisión 
                      if (!ojoExistente) {
                          // Nuevo objeto de tipo Ojo
                          const ojo = {
                            ojo_revision: ojo_revisado,
                            PacienteId: pacienteId
                          }
            
                          //Creamos el objeto Ojo revisado.
                          rev.createOjo(ojo);
            
                      }
                  })
              })
              .catch(err => {
                  res.status(500).send({
                  message: "Error obteniendo revisión con id=" + id
              });
              });

              //Añadimos los medicamentos a la asociación Medicamentos_Revision
              if(medicamentos != null) {
                for (var medicamento in medicamentos) {
                  if(medicamentos[medicamento] == 'Ranibizumab') {
                    rev.addMedicamento(1);
                  }else if(medicamentos[medicamento] == 'Bevacizumab'){
                    rev.addMedicamento(2);
                  }else if(medicamentos[medicamento] == 'Aflibercept'){
                    rev.addMedicamento(3);
                  }else {
                    rev.addMedicamento(4);
                  }
                }
              }
              res.send(rev);
          })
          .catch(err => {
              res.status(500).send({
              message:
                  err.message || "Algún error mientras se creaba la revisión."
              });
          });
    })
    .catch(err => {
      res.status(500).send({
        message:
            err.message || "Algún error mientras se calculaba el coste acumulado de la revisión."
        });
    });
};

// Obtiene todas las Revisiones de un Paciente.
exports.getRevisionesByPaciente = (req, res) => {

  const id = req.params.id;

  db.revisiones.findAll({ 
    include: [
      {
        model: db.pacientes,
        where: { id: id },
      },
      {
        model: db.medicos,
      },
      {
        model: db.medicamentos,
        as: 'Medicamentos'
      },
      {
        model: db.ojos,
        as: 'Ojos'
      }
    ]
    })
    .then(data => {
    res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error mientras se obtenían las revisiones del paciente."
      });
    });
};

// Actualiza una revisión por su ID
exports.updateRevision = (req, res) => {
  
  const idRevision = req.params.idRevision;
  
  db.revisiones.update(req.body, {
    where: { id: idRevision }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Revisión actualizada correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar la revisión con ID=${idRevision}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando revisión con ID=" + idRevision
      });
    });
};

// Elimina una revisión
exports.deleteRevision = (req, res) => {
  const idRevision = req.params.idRevision;

  db.revisiones.destroy({
    where: { id: idRevision }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Revisión eliminada correctamente"
        });
      } else {
        res.send({
          message: `No se puede eliminar la revisión con ID=${idRevision}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se ha podido eliminar el dato con ID = " + idRevision
      });
    });
};

/*****************************************************
 *                OJOS
 *****************************************************/
// Obtiene los ojos revisados en una Revisión.
exports.getOjosFromRevision = (req, res) => {

  const idRevision = req.params.idRevision;

  db.ojos.findAll({ 
    include: [
      {
        model: db.revisiones,
        as: 'Revisiones',
        where: { id: idRevision },
      }
    ]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error mientras se obtenían las revisiones del paciente."
      });
    });
};

// Obtiene las mediciones y escaneres asociadas a un ojo del paciente.
exports.getOjoMedicionEscanerfromPaciente = (req, res) => {

  const idPaciente = req.params.id;
  
  db.ojos.findAll({ 
    attributes: ['id','ojo_revision'],
    where: { PacienteId: idPaciente },
    include: [
      {
        model: db.mediciones,
        attributes: ['fecha_creacion','agudeza_visual'],
        include: [ 
          {
            model: db.revisiones,
            include: [
              {
                model: db.medicamentos,
                as: 'Medicamentos'
              }
            ]
          }
        ]
      },
      {
        model: db.escaneres,
        attributes: ['fecha_creacion',
                    "edema_mac_quis",
                    "grosor_retina",
                    "puntos_reflectantes",
                    "liquido_subrret",
                    "afectacion_capa_int",
                    "afectacion_capa_ext",
                    "tipo_memb_neov"]
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error mientras se obtenían las revisiones del paciente."
      });
    });
};

/*****************************************************
 *                ESCÁNERES
 *****************************************************/
// Obtiene los escáneres de retina realizados a un ojo.
exports.getEscaneresByOjo = (req, res) => {

  const idOjo = req.params.idOjo;

  db.escaneres.findAll({ 
    include: [
      {
        model: db.ojos,
        where: { id: idOjo },
      }
    ]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error mientras se obtenían las revisiones del paciente."
      });
    });
};

// Crea un nuevo escáner
exports.createEscaner = (req, res) => {
  
  const escaner = {
    fecha_creacion: req.body.fecha_creacion,
    edema_mac_quis: req.body.edema_mac_quis,
    grosor_retina: req.body.grosor_retina,
    puntos_reflectantes: req.body.puntos_reflectantes, 
    liquido_subrret: req.body.liquido_subrret,
    afectacion_capa_int: req.body.afectacion_capa_int,                 
    afectacion_capa_ext: req.body.afectacion_capa_ext,                
    tipo_memb_neov: req.body.tipo_memb_neov,
    OjoId: req.params.idOjo        
  };

  // Creamos el escáner de retina 
  Escaner.create(escaner)
    .then( esc => {
        res.send(esc);
    })
    .catch( err => {
        res.status(500).send({
        message:
            err.message || "Algún error mientras se creaba el escáner de retina."
        });
    });
};

// Actualiza un escáner por su ID
exports.updateEscaner = (req, res) => {
  
  const idEscaner = req.params.idEscaner;
  
  db.escaneres.update(req.body, {
    where: { id: idEscaner }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Escáner de retina actualizado correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar el escáner de retina con ID=${idEscaner}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando escáner con ID=" + idEscaner
      });
    });
};


/*****************************************************
 *                MEDICIONES
 *****************************************************/
// Obtiene las mediciones realizadas a un ojo.
exports.getMedicionesByOjo = (req, res) => {

  const idOjo = req.params.idOjo;

  db.mediciones.findAll({ 
    include: [
      {
        model: db.ojos,
        where: { id: idOjo },
      }
    ]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error mientras se obtenían las revisiones del paciente."
      });
    });
};

// Crea una nueva medición 
exports.createMedicion = (req, res) => {
  
  const medicion = {
    fecha_creacion: req.body.fecha_creacion,
    agudeza_visual: req.body.agudeza_visual,
    per_luz: req.body.per_luz,
    mov_manos: req.body.mov_manos,
    cont_dedos: req.body.cont_dedos, 
    OjoId: req.params.idOjo,
    RevisionId: req.params.idRevision       
  };

  // Creamos la medición
  Medicion.create(medicion)
    .then( med => {
        res.send(med);
    })
    .catch( err => {
        res.status(500).send({
        message:
            err.message || "Algún error mientras se registraba la medición."
        });
    });
};

// Actualiza una medición por su ID
exports.updateMedicion = (req, res) => {
  
  const idMedicion = req.params.idMedicion;
  
  db.mediciones.update(req.body, {
    where: { id: idMedicion }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Medición actualizada correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar la medición con ID=${idMedicion}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando medición con ID=" + idMedicion
      });
    });
};