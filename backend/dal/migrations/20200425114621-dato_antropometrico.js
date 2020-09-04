'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Dato_Antropometrico', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_creacion: {
        allowNull: false,
        type: Sequelize.DATE
      },
      obesidad: {
        allowNull: false,
        type: Sequelize.STRING
      },
      peso: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      perim_abdominal: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      imc: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      altura: {
        allowNull: false,
        type: Sequelize.DOUBLE
      }
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false  // Omits creating two extra table columns: created_at and other
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Dato_Antropometrico');

  }
};