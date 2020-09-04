const escaneres = require("../controllers/escaner.controller");
var autenticacion = require('../middleware/autenticacion');
var app = require('express').Router();


// Obtiene un escáner por id
app.get('/:id', autenticacion.verifyToken, escaneres.findOne);


module.exports = app; 