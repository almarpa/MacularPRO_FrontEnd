'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Escaner_Retina', 
    [{
      fecha_creacion: '2019/09/06',
      edema_mac_quis: false,
      grosor_retina: 10,
      puntos_reflectantes: false,
      liquido_subrret: false,
      afectacion_capa_int: true,
      afectacion_capa_ext: false,
      tipo_memb_neov: 'TIPO 2',
      ojoId: 1
    },
    {
      fecha_creacion: '2020/04/21',
      edema_mac_quis: false,
      grosor_retina: 10,
      puntos_reflectantes: false,
      liquido_subrret: false,
      afectacion_capa_int: true,
      afectacion_capa_ext: false,
      tipo_memb_neov: 'TIPO 2',
      ojoId: 2
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Escaner_Retina', null, {});
  }
};
