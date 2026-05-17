/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('sutradara').del()
  await knex('sutradara').insert([
    { name: 'Riri Riza', image: '/uploads/sutradara/riri-riza' },
    { name: 'Hanung Bramantyo', image: '/uploads/sutradara/hanung-bramantyo' },
    { name: 'Gareth Evans', image: '/uploads/sutradara/gareth-evans' },
    { name: 'Joko Anwar', image: '/uploads/sutradara/joko-anwar' },
    { name: 'Mira Lesmana', image: '/uploads/sutradara/mira-lesmana' },
    { name: 'Raditya Dika', image: '/uploads/sutradara/raditya-dika' },
    { name: 'Ernest Prakasa', image: '/uploads/sutradara/ernest-prakasa' },
    { name: 'Edwin', image: '/uploads/sutradara/edwin' },
    { name: 'Angga Dwimas Sasongko', image: '/uploads/sutradara/angga-dwimas-sasongko' },
    { name: 'Ifa Isfansyah', image: '/uploads/sutradara/ifa-isfansyah' },
  ]);
};
