const datos_antrop = require("../controllers/dato_antrop.controller");
var autenticacion = require('../middleware/autenticacion');
var app = require('express').Router();


// Obtiene todos los datos antropométricos 
app.get('/:id', autenticacion.verifyToken, datos_antrop.findOne);


module.exports = app;