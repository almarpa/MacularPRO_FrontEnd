'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Medico', 
    [{
      nombre: 'Maria',
      apellidos: 'Garcia Jiménez',
      correo: 'maria@gmail.com',
      password: 'Maria',
      sexo: 'Femenino',
      telefono: 654123431,
      servicio_unidad: 'Retina-Mácula',
      num_colegiado: 23763818,
      centro: 'Centro 1',
      deBaja: '0',
      rol: 'ADMIN'
    },
    {
      nombre: 'Rubén',
      apellidos: 'Cabrera Beyruti',
      correo: 'ruben@gmail.com',
      password: 'Ruben',
      sexo: 'Masculino',
      telefono: 622343876,
      servicio_unidad: 'Retina-Mácula',
      num_colegiado: 54849232,
      centro: 'Centro 2',
      deBaja: '0',
      rol: 'ADMIN'
    },
    {
      nombre: 'Alejandro',
      apellidos: 'Marco Palomares',
      correo: 'alejandro@gmail.com',
      password: 'Alejandro',
      sexo: 'Masculino',
      telefono: 667543432,
      servicio_unidad: 'Retina-Mácula',
      num_colegiado: 12329232,
      centro: 'Centro 3',
      deBaja: '0',
      rol: 'COLABORADOR'
    },
    {
      nombre: 'Isabel',
      apellidos: 'Sánchez Díaz',
      correo: 'isabel@gmail.com',
      password: 'Isabel',
      sexo: 'Femenino',
      telefono: 753234386,
      servicio_unidad: 'Retina-Mácula',
      num_colegiado: 12345232,
      centro: 'Centro 4',
      deBaja: '0',
      rol: 'COLABORADOR'
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Medico', null, {});
  }
};
