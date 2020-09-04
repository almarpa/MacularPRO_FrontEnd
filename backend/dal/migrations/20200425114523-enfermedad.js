'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Enfermedad', {
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
      fecha: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false  // Omits creating two extra table columns: created_at and other
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Enfermedad');

  }
};