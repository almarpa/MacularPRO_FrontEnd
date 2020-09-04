'use strict';
module.exports = (sequelize, DataTypes) => {
  const Revision = sequelize.define('Revision', {
    fecha_revision: DataTypes.DATE,
    motivo: DataTypes.TEXT,
    observ: DataTypes.TEXT,
    coste_total: DataTypes.DOUBLE,
    coste_acum: DataTypes.DOUBLE
  }, 
  {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false  // Omits creating two extra table columns: created_at and other
  }
  );

  Revision.associate = function(models) {
    Revision.belongsTo(models.Medico);
    Revision.belongsTo(models.Paciente);
    Revision.belongsToMany(models.Ojo, {as: 'Ojos', through: 'Ojo_Revision', freezeTableName: true, timestamps: false});
    Revision.belongsToMany(models.Medicamento, {as: 'Medicamentos', through: 'Medicamento_Revision', freezeTableName: true, timestamps: false});
    Revision.hasMany(models.Medicion);
  };

  return Revision;
};