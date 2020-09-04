'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Revision', 
    [{
      fecha_revision: '2018/12/01',
      motivo: 'Primera visita - toma de contacto',
      observ: 'El paciente presenta DMAE avanzada en el ojo izquierdo.',
      coste_total: 0,
      coste_acum: 0,
      MedicoId: 2,
      PacienteId: 3
    },
    {
      fecha_revision: '2019/09/06',
      motivo: 'Revisión rutinaria',
      observ: 'El paciente pierde un 10% de visión. Se programa dos inyecciones.',
      coste_total: 1000,
      coste_acum: 1000,
      MedicoId: 2,
      PacienteId: 3
    },
    {
      fecha_revision: '2019/11/01',
      motivo: 'Control post-inyección',
      observ: 'El paciente se mantiene estable.',
      coste_total: 0,
      coste_acum: 1000,
      MedicoId: 2,
      PacienteId: 3
    },
    {
      fecha_revision: '2020/02/05',
      motivo: 'Revisión rutinaria',
      observ: 'El paciente presenta síntomas de cataratas, perdida de visión del ojo izquierdo.',
      coste_total: 0,
      coste_acum: 1000,
      MedicoId: 2,
      PacienteId: 3
    },
    {
      fecha_revision: '2019/11/01',
      motivo: 'Control post-operación',
      observ: 'El paciente ha recuperado parte de la visión del ojo izquierdo.',
      coste_total: 0,
      coste_acum: 1000,
      MedicoId: 2,
      PacienteId: 3
    },
    {
      fecha_revision: '2020/02/05',
      motivo: 'Primera visita',
      observ: 'El paciente presenta inicios de DMAE leve en el ojo derecho.',
      coste_total: 0,
      coste_acum: 0,
      MedicoId: 2,
      PacienteId: 4
    },
    {
      fecha_revision: '2020/07/01',
      motivo: 'Inyeccion programada',
      observ: 'El paciente ha notado un empeoramiento de su visión en el ojo derecho. Se programa una inyección.',
      coste_total: 500,
      coste_acum: 500,
      MedicoId: 2,
      PacienteId: 4
    },
    {
      fecha_revision: '2020-01-04',
      motivo: 'Primera revisión del ojo derecho por molestias.',
      observ: 'Primera revisión del ojo derecho por molestias.',
      coste_total: 0,
      coste_acum: 1000,
      MedicoId: 2,
      PacienteId: 3
    },
    {
      fecha_revision: '2020-04-01',
      motivo: 'Segunda revisión del ojo derecho.',
      observ: 'Segunda revisión del ojo derecho.',
      coste_total: 500,
      coste_acum: 1500,
      MedicoId: 2,
      PacienteId: 3
    },
    {
      fecha_revision: '2020-07-21',
      motivo: 'Tercera revisión del ojo derecho.',
      observ: 'Tercera revisión del ojo derecho.',
      coste_total: 1000,
      coste_acum: 2500,
      MedicoId: 2,
      PacienteId: 3
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Revision', null, {});
  }
};
