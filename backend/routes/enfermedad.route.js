const enfermedad = require("../controllers/enfermedad.controller");
var autenticacion = require('../middleware/autenticacion');
var app = require('express').Router();


// Obtiene una enfermedad por id
app.get('/:id', autenticacion.verifyToken, enfermedad.findOne);


module.exports = app;