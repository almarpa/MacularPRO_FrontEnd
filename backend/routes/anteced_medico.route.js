const anteced_medico = require("../controllers/anteced_medico.controller");
var autenticacion = require('../middleware/autenticacion');
var app = require('express').Router();


// Crea un nuevo Antecedente_Medico
app.post('/', autenticacion.verifyToken, anteced_medico.create);

// Obtiene todos los antecedentes medicos
app.get('/', autenticacion.verifyToken, anteced_medico.get);

// Obtiene un antecedente medico
app.get('/:id', autenticacion.verifyToken, anteced_medico.findOne);

// Elimina un antecedente medico
app.delete('/:id', autenticacion.verifyToken, anteced_medico.delete);

// Actualiza un antecedente medico existente
app.put('/:id', autenticacion.verifyToken, anteced_medico.update);


module.exports = app;