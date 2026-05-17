/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('pemeran').del()
  await knex('pemeran').insert([
    { name: 'Reza Rahadian', image: '/uploads/pemeran/reza-rahadian' },
    { name: 'Cut Mini', image: '/uploads/pemeran/cut-mini' },
    { name: 'Raisa Anggiani', image: '/uploads/pemeran/raisa-anggiani' },
    { name: 'Nicholas Saputra', image: '/uploads/pemeran/nicholas-saputra' },
    { name: 'Dian Sastrowardoyo', image: '/uploads/pemeran/dian-sastrowardoyo' },
    { name: 'Iko Uwais', image: '/uploads/pemeran/iko-uwais' },
    { name: 'Bunga Citra Lestari', image: '/uploads/pemeran/bunga-citra-lestari' },
    { name: 'Joe Taslim', image: '/uploads/pemeran/joe-taslim' },
    { name: 'Prisia Nasution', image: '/uploads/pemeran/prisia-nasution' },
    { name: 'Lukman Sardi', image: '/uploads/pemeran/lukman-sardi' },
  ]);
};
