'use strict';
module.exports = (sequelize, DataTypes) => {
  const Enfermedad = sequelize.define('Enfermedad', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    fecha: DataTypes.DATE
  }, 
  {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false  // Omits creating two extra table columns: created_at and other
  });

  Enfermedad.associate = function(models) {
    Enfermedad.belongsToMany(models.Paciente, {as: 'Pacientes', through: 'Paciente_Enfermedad', freezeTableName: true, timestamps: false});
  };
  

  return Enfermedad;
};