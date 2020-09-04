'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ojo_Revision', 
      [{
        OjoId: 1,
        RevisionId: 1,
      },
      {
        OjoId: 1,
        RevisionId: 2,
      },
      {
        OjoId: 1,
        RevisionId: 3,
      },
      {
        OjoId: 1,
        RevisionId: 4,
      },
      {
        OjoId: 1,
        RevisionId: 5,
      },
      {
        OjoId: 2,
        RevisionId: 6,
      },
      {
        OjoId: 2,
        RevisionId: 7,
      },
      {
        OjoId: 3,
        RevisionId: 8,
      },
      {
        OjoId: 3,
        RevisionId: 9,
      },
      {
        OjoId: 3,
        RevisionId: 10,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ojo_Revision', null, {});

  }
};
