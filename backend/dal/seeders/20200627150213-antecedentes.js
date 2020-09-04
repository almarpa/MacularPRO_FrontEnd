'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Anteced_Medico', 
      [{
        nombre: 'Fumador',
        descripcion: 'Desde los 30. Actualmente tiene 54 años.',
        resultado: 1
      },
      {
        nombre: 'Diabetes',
        descripcion: 'Tiene el colesterol alto: 250.',
        resultado: 1
      },
      {
        nombre: 'Otras enfermedades',
        descripcion: 'Cáncer de pulmón. Superado el día 12/07/2008. Padece una serie de secuelas: Problemas digestivos, problemas cardíacos e hipertensión.',
        resultado: 1
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Anteced_Medico', null, {});
  }
};
