/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('genre').del()
  await knex('genre').insert([
    { name: 'Aksi' },
    { name: 'Drama' },
    { name: 'Komedi' },
    { name: 'Horor' },
    { name: 'Romantis' },
    { name: 'Thriller' },
    { name: 'Petualangan' },
    { name: 'Animasi' },
    { name: 'Biografi' },
    { name: 'Sejarah' },
  ]);
};
