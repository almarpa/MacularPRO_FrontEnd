const pacientes = require("../controllers/paciente.controller");
var autenticacion = require('../middleware/autenticacion');
var app = require('express').Router();


// Crea un nuevo paciente
app.post('/', autenticacion.verifyToken, pacientes.createPaciente);
// Obtiene todos los pacientes
app.get('/', autenticacion.verifyToken, pacientes.get);
// Obtiene todos los pacientes inhabilitados
app.get('/baja', autenticacion.verifyToken, pacientes.getPacientesDeBaja);
// Obtiene un paciente
app.get('/:id', autenticacion.verifyToken, pacientes.getById);
// Obtiene todos los pacientes registrados por el nombre o apellido introducido (búsquedas)
app.get('/busqueda/:termino', autenticacion.verifyToken, pacientes.getAllByTerm);
// Obtiene todos los pacientes asociados a un medico por el nombre o apellido introducido (búsquedas)
app.get('/:id/busqueda/:termino', autenticacion.verifyToken, pacientes.getAsocByTerm);
// Elimina un paciente
app.delete('/:id', autenticacion.verifyToken, pacientes.delete);
// Actualiza un paciente
app.put('/:id', autenticacion.verifyToken, pacientes.update);

// Obtiene los antecedentes de un paciente
app.get('/:id/antecedentes', autenticacion.verifyToken, pacientes.getAntecedentesByPaciente);
// Crea y asocia un antecedente a un paciente
app.post('/:id/antecedentes', autenticacion.verifyToken, pacientes.createAntecedente);
// Actualiza un antecedente médico
app.put('/:id/antecedentes/:idAntecedente', autenticacion.verifyToken, pacientes.updateAntecedente);
// Elimina un antecedente
app.delete('/:id/antecedentes/:idAntecedente', autenticacion.verifyToken, pacientes.deleteAntecedente);

// Obtiene las enfermedades de un paciente
app.get('/:id/enfermedades', autenticacion.verifyToken, pacientes.getEnfermedadesByPaciente);
// Crea y asocia una enfermedad a un paciente
app.post('/:id/enfermedades', autenticacion.verifyToken, pacientes.createEnfermedad);
// Actualiza una enfermedad
app.put('/:id/enfermedades/:idEnfermedad', autenticacion.verifyToken, pacientes.updateEnfermedad);
// Elimina una enfermedad
app.delete('/:id/enfermedades/:idEnfermedad', autenticacion.verifyToken, pacientes.deleteEnfermedad);

// Obtiene los datos antropométricos de un paciente
app.get('/:id/datos-antropometricos', autenticacion.verifyToken, pacientes.getDatosAntropByPaciente);
// Crea y asocia un dato antropométrico a un paciente
app.post('/:id/datos-antropometricos', autenticacion.verifyToken, pacientes.createDato);
// Actualiza un dato antropométrico
app.put('/:id/datos-antropometricos/:idDato', autenticacion.verifyToken, pacientes.updateDato);
// Elimina un dato antropométrico
app.delete('/:id/datos-antropometricos/:idDato', autenticacion.verifyToken, pacientes.deleteDato);

// Crea una revisión a un paciente
app.post('/:id/revisiones', autenticacion.verifyToken, pacientes.createRevision);
// Obtiene las revisiones de un paciente
app.get('/:id/revisiones', autenticacion.verifyToken, pacientes.getRevisionesByPaciente);
// Actualiza una revisión
app.put('/:id/revisiones/:idRevision', autenticacion.verifyToken, pacientes.updateRevision);
// Elimina una revisión
app.delete('/:id/revisiones/:idRevision', autenticacion.verifyToken, pacientes.deleteRevision);

//Obtiene los ojos revisados de una revisión
app.get('/:id/revisiones/:idRevision/ojos', autenticacion.verifyToken, pacientes.getOjosFromRevision);

// Crea una escáner retina asociado al ojo de un paciente
app.post('/:id/ojos/:idOjo/escaneres', autenticacion.verifyToken, pacientes.createEscaner);
// Obtiene los escáneres de retina asociados al ojo de un paciente
app.get('/:id/ojos/:idOjo/escaneres', autenticacion.verifyToken, pacientes.getEscaneresByOjo);
// Actualiza un escáner de retina 
app.put('/:id/escaneres/:idEscaner', autenticacion.verifyToken, pacientes.updateEscaner);

// Crea una medición asociada al ojo de un paciente
app.post('/:id/revisiones/:idRevision/ojos/:idOjo/mediciones', autenticacion.verifyToken, pacientes.createMedicion);
// Obtiene las mediciones asociadas al ojo de un paciente
app.get('/:id/ojos/:idOjo/mediciones', autenticacion.verifyToken, pacientes.getMedicionesByOjo);
// Actualiza una medición
app.put('/:id/mediciones/:idMedicion', autenticacion.verifyToken, pacientes.updateMedicion);

//Gráficas
//Obtiene las mediciones y escáneres para cada uno de los ojos registrados del paciente
app.get('/:id/ojos', autenticacion.verifyToken, pacientes.getOjoMedicionEscanerfromPaciente);


module.exports = app; 