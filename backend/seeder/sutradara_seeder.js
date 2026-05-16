/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sutradara').del()
  await knex('sutradara').insert([
    { name: 'Riri Riza', image: '/uploads/sutradara/riri-riza' },
    { name: 'Joko Anwar', image: '/uploads/sutradara/joko-anwar' },
    { name: 'Fajar Bustomi', image: '/uploads/sutradara/fajar-bustomi' },
    { name: 'Pidi Baiq', image: '/uploads/sutradara/pidi-baiq' },
    { name: 'Muhadkly Acho', image: '/uploads/sutradara/muhadkly-acho' }
  ]);
};
