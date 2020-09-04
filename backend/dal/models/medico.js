'use strict';
module.exports = (sequelize, Sequelize) => {

    const Medico = sequelize.define("Medico", {
        nombre: Sequelize.STRING,
        apellidos: Sequelize.STRING,
        correo: Sequelize.STRING,
        password: Sequelize.STRING,
        sexo: Sequelize.STRING,
        telefono: Sequelize.INTEGER,
        servicio_unidad: Sequelize.STRING,
        num_colegiado: Sequelize.INTEGER,
        centro: Sequelize.STRING,
        deBaja: Sequelize.BOOLEAN,
        rol: Sequelize.STRING
      }, 
        {
          freezeTableName: true, // Model tableName will be the same as the model name
          timestamps: false  // Omits creating two extra table columns: created_at and other
        }
      );

      // Relations
      Medico.associate = function(models) {
        Medico.hasMany(models.Paciente);
        Medico.hasMany(models.Revision);
        Medico.belongsToMany(models.Hospital, {as: 'Hospitales', through: 'HospitalMedico', freezeTableName: true, timestamps: false});
      
      } 


    return Medico;
};