const medicos = require("../controllers/medico.controller");
var autenticacion = require('../middleware/autenticacion');
var app = require('express').Router();


// Crea un nuevo médico/colaborador (depende del rol)
app.post('/', autenticacion.verifyToken, medicos.create);

// Obtiene todos los médicos y colaboradores no dados de baja
app.get('/', autenticacion.verifyToken, medicos.getMedicosHabilitados);

// Obtiene únicamente los médicos (no dados de baja)
app.get('/only', autenticacion.verifyToken, medicos.getOnlyMedicos);

// Obtiene todos los médicos y colaboradores dados de baja
app.get('/baja', autenticacion.verifyToken, medicos.getMedicosInhabilitados);

// Obtiene un médico/colaborador por Id
app.get('/:id', autenticacion.verifyToken, medicos.findOne);

// Obtiene los pacientes de un médico
app.get('/:id/pacientes', autenticacion.verifyToken, medicos.getPacientesByMedico);

// Elimina un médico/colaborador
app.delete('/:id', autenticacion.verifyToken, medicos.delete);

// Actualiza un médico/colaborador existente
app.put('/:id', autenticacion.verifyToken, medicos.update);


module.exports = app;