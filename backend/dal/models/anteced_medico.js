'use strict';
module.exports = (sequelize, DataTypes) => {
  const Anteced_Medico = sequelize.define('Anteced_Medico', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    resultado: DataTypes.BOOLEAN
  }, 
  {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false  // Omits creating two extra table columns: created_at and other
  });

  Anteced_Medico.associate = function(models) {
    Anteced_Medico.belongsToMany(models.Paciente, {as: 'Pacientes', through: 'Paciente_Antec_Med', freezeTableName: true, timestamps: false});
  };    


  return Anteced_Medico;
};