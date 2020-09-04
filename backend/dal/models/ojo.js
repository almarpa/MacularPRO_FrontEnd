'use strict';
module.exports = (sequelize, Sequelize) => {

    const Ojo = sequelize.define("Ojo", {
        ojo_revision: {
          type: Sequelize.STRING
        }
      }, 
        {
          freezeTableName: true, // Model tableName will be the same as the model name
          timestamps: false  // Omits creating two extra table columns: created_at and other
        }
      );

      // Relations
      Ojo.associate = function(models) {
        Ojo.belongsToMany(models.Revision, {as: 'Revisiones', through: 'Ojo_Revision', freezeTableName: true, timestamps: false});
        Ojo.hasMany(models.Medicion);
        Ojo.hasMany(models.Escaner_Retina);
      } 

    return Ojo;
};