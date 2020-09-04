'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Medicion', {
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
      agudeza_visual: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      per_luz: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      mov_manos: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      cont_dedos: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      OjoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Ojo",
          key: "id"
        }
      },
      RevisionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Revision",
          key: "id"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Medicion');
  }
};