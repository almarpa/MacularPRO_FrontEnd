// Imports
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Import Routes
const loginRoutes = require('./routes/login.route');
const hospitalRoutes = require('./routes/hospital.route');
const medicoRoutes = require('./routes/medico.route');
const pacienteRoutes = require('./routes/paciente.route');
const dato_antropRoutes = require('./routes/dato_antrop.route');
const anteced_medicoRoutes = require('./routes/anteced_medico.route');
const enfermedadRoutes = require('./routes/enfermedad.route');
const revisionRoutes = require('./routes/revision.route');
const escanerRoutes = require('./routes/escaner.route');
const medicionRoutes = require('./routes/medicion.route');

// Listener
var app = express();
app.listen(3000, function () {
    console.log('Server listen on port:', 3000);
});

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Public - Express
app.use(express.static(path.join(__dirname, 'public')));

// CORS 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    
    next();
  });

// Routes - Middleware
app.use('/login', loginRoutes);
app.use('/hospitales', hospitalRoutes);
app.use('/medicos', medicoRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/datos-antropometricos', dato_antropRoutes);
app.use('/enfermedades', enfermedadRoutes);
app.use('/antecedentes', anteced_medicoRoutes);
app.use('/revisiones', revisionRoutes);
app.use('/escaneres', escanerRoutes);
app.use('/mediciones', medicionRoutes);


