'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ojo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ojo_revision: {
        allowNull: false,
        type: Sequelize.STRING
      },
      PacienteId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Paciente",
          key: "id"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ojo');
  }
};