'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dato_Antropometrico = sequelize.define('Dato_Antropometrico', {
    fecha_creacion: DataTypes.DATE,
    obesidad: DataTypes.STRING,
    peso: DataTypes.DOUBLE,
    perim_abdominal: DataTypes.DOUBLE,
    imc: DataTypes.DOUBLE,
    altura: DataTypes.DOUBLE
  }, 
  {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false  // Omits creating two extra table columns: created_at and other
  });

  Dato_Antropometrico.associate = function(models) {
    Dato_Antropometrico.belongsToMany(models.Paciente, {as: 'Pacientes', through: 'Paciente_Dato_Antrop', freezeTableName: true, timestamps: false});
  };


  return Dato_Antropometrico;
};