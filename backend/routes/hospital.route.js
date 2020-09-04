const hospitales = require("../controllers/hospital.controller");
var autenticacion = require('../middleware/autenticacion');
var app = require('express').Router();

// Crea un nuevo hospital
app.post('/', autenticacion.verifyToken, hospitales.create);

// Obtiene todos los hospitales
app.get('/', autenticacion.verifyToken, hospitales.get);

// Obtiene un hospital
app.get('/:id', autenticacion.verifyToken, hospitales.findOne);

// Obtiene todos los hospitales en su nombre cierto término (búsquedas)
app.get('/busqueda/:termino', autenticacion.verifyToken, hospitales.getByTerm);

// Obtiene todos los hospitales en su nombre cierto término (búsquedas)
app.get('/:id/medicos', autenticacion.verifyToken, hospitales.getMedicosByHospital);

// Elimina un hospital
app.delete('/:id', autenticacion.verifyToken, hospitales.delete);

// Actualiza un hospital existente
app.put('/:id', autenticacion.verifyToken, hospitales.update);

module.exports = app;