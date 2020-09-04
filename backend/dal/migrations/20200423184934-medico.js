'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Medico', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      apellidos: {
        allowNull: false,
        type: Sequelize.STRING
      },
      correo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sexo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.INTEGER
      },
      servicio_unidad: {
        type: Sequelize.STRING
      },
      num_colegiado: {
        type: Sequelize.INTEGER
      },
      centro: {
        type: Sequelize.STRING
      },
      deBaja: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      rol: {
        allowNull: false,
        type: Sequelize.STRING
      }
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false  // Omits creating two extra table columns: created_at and other
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Medico');
  }
};
