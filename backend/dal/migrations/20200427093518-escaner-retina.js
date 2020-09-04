'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Escaner_Retina', {
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
      edema_mac_quis: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      grosor_retina: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      puntos_reflectantes: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      liquido_subrret: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      afectacion_capa_int: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      afectacion_capa_ext: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      tipo_memb_neov: {
        allowNull: false,
        type: Sequelize.STRING
      },
      OjoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Ojo",
          key: "id"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Escaner_Retina');
  }
};