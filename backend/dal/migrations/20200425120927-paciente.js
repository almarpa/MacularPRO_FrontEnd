'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Paciente', {
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
      sip: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      fecha_nac: {
        allowNull: false,
        type: Sequelize.DATE
      },
      sexo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      clase_econom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deBaja: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      MedicoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Medico",
          key: "id"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Paciente');
  }
};