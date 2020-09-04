'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Hospital', {
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
      ciudad: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telefono: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      url: {
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
    return queryInterface.dropTable('Hospital');
  }
};
