'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Dato_antropometrico', 
      [{
        fecha_creacion: '2019/07/12',
        obesidad: 'MODERADA',
        peso: 101,
        perim_abdominal: 101,
        imc: 33.9,
        altura: 176
      },
      {
        fecha_creacion: '2019/01/07',
        obesidad: 'MODERADA',
        peso: 99,
        perim_abdominal: 103,
        imc: 33,
        altura: 176
      },
      {
        fecha_creacion: '2019/05/27',
        obesidad: 'LEVE',
        peso: 92,
        perim_abdominal: 100,
        imc: 31.5,
        altura: 175
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Dato_antropometrico', null, {});
  }
};
