const login = require("../controllers/login.controller");
var app = require('express').Router();


// Login de usuario-medico
app.post('/', login.autenticate);
 

module.exports = app; 