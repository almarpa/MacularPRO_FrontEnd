'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Medicamento', 
    [{
      nombre: 'Lucentis',
      descripcion: 'Descripcion 1',
      precio: 500,
      dosis: 1
    },
    {
      nombre: 'Eylea',
      descripcion: 'Descripcion 2',
      precio: 500,
      dosis: 1
    },
    {
      nombre: 'Avastin',
      descripcion: 'Descripcion 3',
      precio: 500,
      dosis: 1
    },
    {
      nombre: 'Dexametasona',
      descripcion: 'Descripcion 4',
      precio: 1000,
      dosis: 1
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Medicamento', null, {});
  }
};
