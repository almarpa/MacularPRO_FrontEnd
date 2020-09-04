'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ojo', 
    [{
      ojo_revision: 'IZQUIERDO',
      PacienteId: 3
    },
    {
      ojo_revision: 'DERECHO',
      PacienteId: 4
    },
    {
      ojo_revision: 'DERECHO',
      PacienteId: 3
    },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ojo', null, {});
  }
};
