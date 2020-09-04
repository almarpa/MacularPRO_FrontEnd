'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Revision', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_revision: {
        allowNull: false,
        type: Sequelize.DATE
      },
      motivo: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      observ: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      coste_total: {
        type: Sequelize.DOUBLE
      },
      coste_acum: {
        type: Sequelize.DOUBLE
      },
      MedicoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Medico",
          key: "id"
        }
      },
      PacienteId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Paciente",
          key: "id"
        }
      }
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false  // Omits creating two extra table columns: created_at and other
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Revision');
  }
};