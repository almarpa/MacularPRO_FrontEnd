'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { development } = require('../../config/config.json');
const db = {};

// Config Developer mode
const sequelize = new Sequelize(development.database, development.username, development.password, development);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//       MODELOS       //
db.medicos = require("./medico.js")(sequelize, Sequelize);
db.hospitales = require("./hospital.js")(sequelize, Sequelize);
db.pacientes = require("./paciente.js")(sequelize, Sequelize);
db.enfermedades = require("./enfermedad.js")(sequelize, Sequelize);
db.dato_antropometricos = require("./dato_antropometrico.js")(sequelize, Sequelize);
db.anteced_medicos = require("./anteced_medico.js")(sequelize, Sequelize);
db.revisiones = require("./revision.js")(sequelize, Sequelize);
db.ojos = require("./ojo.js")(sequelize, Sequelize);
db.medicamentos = require("./medicamento.js")(sequelize, Sequelize);
db.mediciones = require("./medicion.js")(sequelize, Sequelize);
db.escaneres = require("./escaner_retina.js")(sequelize, Sequelize);

//       ASOCIACIONES       //
//Hospitales
db.hospitales.belongsToMany(db.medicos, {as: 'Medicos', through: 'HospitalMedico', freezeTableName: true, timestamps: false});
//Médicos
db.medicos.belongsToMany(db.hospitales, {as: 'Hospitales', through: 'HospitalMedico', freezeTableName: true, timestamps: false});
db.medicos.hasMany(db.pacientes);
db.medicos.hasMany(db.revisiones);
//Pacientes
db.pacientes.belongsTo(db.medicos);
db.pacientes.hasMany(db.revisiones);
db.pacientes.hasMany(db.ojos);
db.pacientes.belongsToMany(db.enfermedades, {as: 'Enfermedades', through: 'Paciente_Enfermedad', freezeTableName: true, timestamps: false});
db.pacientes.belongsToMany(db.dato_antropometricos, {as: 'Datos_Antropo', through: 'Paciente_Dato_Antrop', freezeTableName: true, timestamps: false});
db.pacientes.belongsToMany(db.anteced_medicos, {as: 'Antecedentes', through: 'Paciente_Antec_Med', freezeTableName: true, timestamps: false});
//Antecedentes médicos
db.anteced_medicos.belongsToMany(db.pacientes, {as: 'Pacientes', through: 'Paciente_Antec_Med', freezeTableName: true, timestamps: false});
//Datos antropométricos
db.dato_antropometricos.belongsToMany(db.pacientes, {as: 'Pacientes', through: 'Paciente_Dato_Antrop', freezeTableName: true, timestamps: false});
//Enfermedades
db.enfermedades.belongsToMany(db.pacientes, {as: 'Pacientes', through: 'Paciente_Enfermedad', freezeTableName: true, timestamps: false});
//Revisiones
db.revisiones.hasMany(db.mediciones);
db.revisiones.belongsTo(db.medicos);
db.revisiones.belongsTo(db.pacientes);
db.revisiones.belongsToMany(db.ojos, {as: 'Ojos', through: 'Ojo_Revision', freezeTableName: true, timestamps: false});
db.revisiones.belongsToMany(db.medicamentos, {as: 'Medicamentos', through: 'Medicamento_Revision', freezeTableName: true, timestamps: false});
//Ojo
db.ojos.belongsToMany(db.revisiones, {as: 'Revisiones', through: 'Ojo_Revision', freezeTableName: true, timestamps: false});
db.ojos.belongsTo(db.pacientes);
db.ojos.hasMany(db.mediciones);
db.ojos.hasMany(db.escaneres);
//Medicamento
db.medicamentos.belongsToMany(db.revisiones , {as: 'Revisiones', through: 'Medicamento_Revision', freezeTableName: true, timestamps: false});
//Mediciones
db.mediciones.belongsTo(db.ojos);
db.mediciones.belongsTo(db.revisiones);

//Escaneres
db.escaneres.belongsTo(db.ojos);


// Realizamos una sincronización para actualizar las asociaciones establecidas
sequelize.sync();



module.exports = db;
