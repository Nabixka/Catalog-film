/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('genre_film').del()
  await knex('genre_film').insert([
    { genre_id: 2, film_id: 1 }, // Drama - Laskar Pelangi
    { genre_id: 7, film_id: 1 }, // Petualangan - Laskar Pelangi
    { genre_id: 1, film_id: 2 }, // Aksi - The Raid
    { genre_id: 6, film_id: 2 }, // Thriller - The Raid
    { genre_id: 5, film_id: 3 }, // Romantis - AADC
    { genre_id: 2, film_id: 3 }, // Drama - AADC
    { genre_id: 2, film_id: 5 }, // Drama - Habibie & Ainun
    { genre_id: 9, film_id: 5 }, // Biografi - Habibie & Ainun
    { genre_id: 3, film_id: 6 }, // Komedi - Comic 8
    { genre_id: 2, film_id: 4 } // - Seperti Dendam, Rindu Harus Dibayar Tuntas
  ]);
};
