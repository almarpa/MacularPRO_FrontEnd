'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Medicamento_Revision', 
      [{
        MedicamentoId: 1,
        RevisionId: 2,
      },
      {
        MedicamentoId: 2,
        RevisionId: 2,
      },
      {
        MedicamentoId: 1,
        RevisionId: 7,
      },
      {
        MedicamentoId: 3,
        RevisionId: 8,
      },
      {
        MedicamentoId: 4,
        RevisionId: 10,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Medicamento_Revision', null, {});

  }
};
