'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Hospital', 
    [{
      nombre: 'Hospital Vega Baja',
      ciudad: 'Orihuela',
      telefono: 966749185,
      url: 'http://www.dep21.san.gva.es/deporihuela/?page_id=9'
    },
    {
      nombre: 'Hospital Virgen de los Lirios',
      ciudad: 'Alcoy',
      telefono: 965537400,
      url: 'http://alcoy.san.gva.es/cas/hospital/datos.htm'
    },
    {
      nombre: 'Hospital Lluís Alcanyís',
      ciudad: 'Xàtiva',
      telefono: 962289300,
      url: 'http://xativaontinyent.san.gva.es/hospitales'
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Hospital', null, {});
  }
};
