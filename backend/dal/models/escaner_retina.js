'use strict';
module.exports = (sequelize, DataTypes) => {
  const Escaner_Retina = sequelize.define('Escaner_Retina', {
    fecha_creacion: DataTypes.DATE,
    edema_mac_quis: DataTypes.BOOLEAN,
    grosor_retina: DataTypes.INTEGER,
    puntos_reflectantes: DataTypes.BOOLEAN,
    liquido_subrret: DataTypes.BOOLEAN,
    afectacion_capa_int: DataTypes.BOOLEAN,
    afectacion_capa_ext: DataTypes.BOOLEAN,
    tipo_memb_neov: DataTypes.STRING
  }, 
  {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false  // Omits creating two extra table columns: created_at and other
  });

  Escaner_Retina.associate = function(models) {
    Escaner_Retina.belongsTo(models.Ojo);
  };


  return Escaner_Retina;
};