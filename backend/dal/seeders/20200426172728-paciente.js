'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Paciente', 
    [{
      nombre: 'Nuria',
      apellidos: 'Iranzo Martinez',
      sip: 23434656,
      fecha_nac: '2000/12/12',
      sexo: 'Femenino',
      clase_econom: 'MEDIA',
      deBaja: '0',
      medicoId: 1
    },
    {
      nombre: 'Jaime',
      apellidos: 'Ortiz Villenas',
      sip: 34234346,
      fecha_nac: '1990/02/20',
      sexo: 'Indefinido',
      clase_econom: 'ALTA',
      deBaja: '0',
      medicoId: 1
    },
    {
      nombre: 'Luis',
      apellidos: 'Villalba Giménez',
      sip: 43242342,
      fecha_nac: '1985/09/10',
      sexo: 'Masculino',
      clase_econom: 'MEDIA',
      deBaja: '0',
      medicoId: 2
    },
    {
      nombre: 'Luisa',
      apellidos: 'Martinez Pérez',
      sip: 14324239,
      fecha_nac: '1976/09/10',
      sexo: 'Femenino',
      clase_econom: 'ALTA',
      deBaja: '0',
      medicoId: 2
    },
    {
      nombre: 'Isabel',
      apellidos: 'Giménez Rubio',
      sip: 18731093,
      fecha_nac: '1976-09-10',
      sexo: 'Femenino',
      clase_econom: 'ALTA',
      deBaja: '0',
      medicoId: 1
    },
    {
      nombre: 'Antonio',
      apellidos: 'Guisado Pérez',
      sip: 23456536,
      fecha_nac: '1976/09/10',
      sexo: 'Masculino',
      clase_econom: 'MEDIA',
      deBaja: '0',
      medicoId: 2
    },
    {
      nombre: 'Manuela',
      apellidos: 'Albert Iniesta',
      sip: 23929309,
      fecha_nac: '1976/09/10',
      sexo: 'Femenino',
      clase_econom: 'ALTA',
      deBaja: '0',
      medicoId: 2
    },
    {
      nombre: 'Federico',
      apellidos: 'García Martínez',
      sip: 74532723,
      fecha_nac: '1976/09/10',
      sexo: 'Masculino',
      clase_econom: 'BAJA',
      deBaja: '0',
      medicoId: 2
    },
    {
      nombre: 'Aida',
      apellidos: 'Gisbert García',
      sip: 23488653,
      fecha_nac: '1976/09/10',
      sexo: 'Femenino',
      clase_econom: 'ALTA',
      deBaja: '0',
      medicoId: 2
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Paciente', null, {});
  }
};
