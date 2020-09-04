'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Enfermedad', 
      [{
        nombre: 'Edema macular diabético',
        descripcion: 'Sufre diabetes.',
        fecha: '2019-07-12'
      },
      {
        nombre: 'Degeneración macular asociada a la edad (DMAE)',
        descripcion: 'DMAE de tipo seca en el ojo izquierdo. Aparición de drusas y pérdida de visión.',
        fecha: '2019-12-20'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Enfermedad', null, {});
  }
};
