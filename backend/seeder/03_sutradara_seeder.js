/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('sutradara').del()
  await knex('sutradara').insert([
    { name: 'Riri Riza', image: '/uploads/sutradara/riri-riza.jpg' },
    { name: 'Hanung Bramantyo', image: '/uploads/sutradara/hanung-bramantyo.jpg' },
    { name: 'Gareth Evans', image: '/uploads/sutradara/gareth-evans.jpg' },
    { name: 'Joko Anwar', image: '/uploads/sutradara/joko-anwar.jpg' },
    { name: 'Mira Lesmana', image: '/uploads/sutradara/mira-lesmana.jpg' },
    { name: 'Raditya Dika', image: '/uploads/sutradara/raditya-dika.jpg' },
    { name: 'Ernest Prakasa', image: '/uploads/sutradara/ernest-prakasa.jpg' },
    { name: 'Edwin', image: '/uploads/sutradara/edwin.jpg' },
    { name: 'Angga Dwimas Sasongko', image: '/uploads/sutradara/angga-dwimas-sasongko.jpg' },
    { name: 'Ifa Isfansyah', image: '/uploads/sutradara/ifa-isfansyah.jpg' },
  ]);
};
