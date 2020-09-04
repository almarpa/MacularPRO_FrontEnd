const mediciones = require("../controllers/medicion.controller");
var autenticacion = require('../middleware/autenticacion');
var app = require('express').Router();


// Obtiene una medición por id
app.get('/:id', autenticacion.verifyToken, mediciones.findOne);


module.exports = app; 