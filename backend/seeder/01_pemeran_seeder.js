/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('pemeran').del()
  await knex('pemeran').insert([
    { name: 'Reza Rahadian', image: '/uploads/pemeran/reza-rahadian.jpg' },
    { name: 'Cut Mini', image: '/uploads/pemeran/cut-mini.jpg' },
    { name: 'Raisa Anggiani', image: '/uploads/pemeran/raissa-anggiani.jpg' },
    { name: 'Nicholas Saputra', image: '/uploads/pemeran/nicholas-saputra.jpg' },
    { name: 'Dian Sastrowardoyo', image: '/uploads/pemeran/dian-sastrowardoyo.jpg' },
    { name: 'Iko Uwais', image: '/uploads/pemeran/iko-uwais.jpg' },
    { name: 'Bunga Citra Lestari', image: '/uploads/pemeran/bunga-citra-lestari.jpg' },
    { name: 'Joe Taslim', image: '/uploads/pemeran/joe-taslim.jpg' },
    { name: 'Prisia Nasution', image: '/uploads/pemeran/prisia-nasution.jpg' },
    { name: 'Lukman Sardi', image: '/uploads/pemeran/lukman-sardi.jpg' },
  ]);
};
