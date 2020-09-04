'use strict';
module.exports = (sequelize, DataTypes) => {
  const Paciente = sequelize.define('Paciente', {
      nombre: DataTypes.STRING,
      apellidos: DataTypes.STRING,
      sip: DataTypes.INTEGER,
      fecha_nac: DataTypes.DATE,
      sexo: DataTypes.STRING,
      clase_econom: DataTypes.STRING,
      deBaja: DataTypes.BOOLEAN
      }, 
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false  // Omits creating two extra table columns: created_at and other
    }
  );

  Paciente.associate = function(models) {
    Paciente.belongsTo(models.Medico);
    Paciente.belongsToMany(models.Enfermedad, {as: 'Enfermedades', through: 'Paciente_Enfermedad', freezeTableName: true, timestamps: false});
    Paciente.belongsToMany(models.Dato_Antropometrico, {as: 'Datos_Antropo', through: 'Paciente_Dato_Antrop', freezeTableName: true, timestamps: false});
    Paciente.belongsToMany(models.Anteced_Medico, {as: 'Antecedentes', through: 'Paciente_Antec_Med', freezeTableName: true, timestamps: false});
    Paciente.hasMany(models.Revision);
  };

  
  return Paciente;
};