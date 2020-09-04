'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Anteced_Medico', {
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
      descripcion: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      resultado: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      }
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false  // Omits creating two extra table columns: created_at and other
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Anteced_Medico');

  }
};