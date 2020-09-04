'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define('Hospital', {
    nombre: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, 
  {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false  // Omits creating two extra table columns: created_at and other
  });

  Hospital.associate = function(models) {
    Hospital.belongsToMany(models.Medico, {as: 'Medicos', through: 'HospitalMedico', freezeTableName: true, timestamps: false});
  };


  return Hospital;
};