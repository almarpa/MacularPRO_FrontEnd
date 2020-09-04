const revisiones = require("../controllers/revision.controller");
var autenticacion = require('../middleware/autenticacion');
var app = require('express').Router();


// Obtiene una revision por id
app.get('/:id', autenticacion.verifyToken, revisiones.findOne);


module.exports = app; 