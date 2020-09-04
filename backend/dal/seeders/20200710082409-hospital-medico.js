'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('HospitalMedico', 
      [{
        HospitalId: 1,
        MedicoId: 1,
      },
      {
        HospitalId: 1,
        MedicoId: 2,
      },
      {
        HospitalId: 2,
        MedicoId: 2,
      },
      {
        HospitalId: 3,
        MedicoId: 2,
      },
      {
        HospitalId: 1,
        MedicoId: 3,
      },
      {
        HospitalId: 3,
        MedicoId: 3,
      },
      {
        HospitalId: 2,
        MedicoId: 4,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('HospitalMedico', null, {});
  }
};
