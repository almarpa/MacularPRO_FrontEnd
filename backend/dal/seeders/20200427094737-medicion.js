'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Medicion', 
    [{
      fecha_creacion: '2018/12/01',
      agudeza_visual: 0.7,
      per_luz: 1,
      mov_manos: 1,
      cont_dedos: 1,
      ojoId: 1,
      revisionId: 1
    },
    {
      fecha_creacion: '2019/09/06',
      agudeza_visual: 0.6,
      per_luz: 1,
      mov_manos: 1,
      cont_dedos: 1,
      ojoId: 1,
      revisionId: 2
    },
    {
      fecha_creacion: '2019/11/01',
      agudeza_visual: 0.9,
      per_luz: 1,
      mov_manos: 1,
      cont_dedos: 1,
      ojoId: 1,
      revisionId: 3
    },
    {
      fecha_creacion: '2020/02/05',
      agudeza_visual: 0.9,
      per_luz: 1,
      mov_manos: 1,
      cont_dedos: 1,
      ojoId: 1,
      revisionId: 4
    },
    {
      fecha_creacion: '2020/07/01',
      agudeza_visual: 0.8,
      per_luz: 1,
      mov_manos: 1,
      cont_dedos: 1,
      ojoId: 1,
      revisionId: 5
    },
    {
      fecha_creacion: '2019/07/01',
      agudeza_visual: 0.8,
      per_luz: 1,
      mov_manos: 1,
      cont_dedos: 1,
      ojoId: 2,
      revisionId: 6
    },
    {
      fecha_creacion: '2020/04/21',
      agudeza_visual: 0.9,
      per_luz: 1,
      mov_manos: 1,
      cont_dedos: 1,
      ojoId: 2,
      revisionId: 7
    },
    {
      fecha_creacion: '2020/01/04',
      agudeza_visual: 0.8,
      per_luz: 1,
      mov_manos: 1,
      cont_dedos: 1,
      ojoId: 3,
      revisionId: 8
    },
    {
      fecha_creacion: '2020/04/01',
      agudeza_visual: 0.7,
      per_luz: 1,
      mov_manos: 1,
      cont_dedos: 1,
      ojoId: 3,
      revisionId: 9
    },
    {
      fecha_creacion: '2020/07/21',
      agudeza_visual: 0.8,
      per_luz: 1,
      mov_manos: 1,
      cont_dedos: 1,
      ojoId: 3,
      revisionId: 10
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Medicion', null, {});
  }
};
