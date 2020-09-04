'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medicamento = sequelize.define('Medicamento', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    precio: DataTypes.DOUBLE,
    dosis: DataTypes.INTEGER
  }, 
  {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false  // Omits creating two extra table columns: created_at and other
  });

  Medicamento.associate = function(models) {
    Medicamento.belongsToMany(models.Revision, {as: 'Revisiones', through: 'Medicamento_Revision', freezeTableName: true, timestamps: false});
  };
  
  
  return Medicamento;
};