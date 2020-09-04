'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medicion = sequelize.define('Medicion', {
    fecha_creacion: DataTypes.DATE,
    agudeza_visual: DataTypes.DOUBLE,
    per_luz: DataTypes.BOOLEAN,
    mov_manos: DataTypes.BOOLEAN,
    cont_dedos: DataTypes.BOOLEAN
  }, 
  {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false  // Omits creating two extra table columns: created_at and other
  });

  Medicion.associate = function(models) {
    Medicion.belongsTo(models.Revision);
    Medicion.belongsTo(models.Ojo);
  };


  return Medicion;
};