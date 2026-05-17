/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('pemeran_film').del()
  await knex('pemeran_film').insert([
    { pemeran_id: 2, film_id: 1 },  // Cut Mini - Laskar Pelangi
    { pemeran_id: 8, film_id: 2 },  // Joe Taslim - The Raid
    { pemeran_id: 6, film_id: 2 },  // Iko Uwais - The Raid
    { pemeran_id: 4, film_id: 3 },  // Nicholas Saputra - AADC
    { pemeran_id: 5, film_id: 3 },  // Dian Sastrowardoyo - AADC
    { pemeran_id: 1, film_id: 5 },  // Reza Rahadian - Habibie & Ainun
    { pemeran_id: 7, film_id: 5 },  // Bunga Citra Lestari - Habibie & Ainun
    { pemeran_id: 10, film_id: 7 }, // Lukman Sardi - NKCTHI
    { pemeran_id: 9, film_id: 8 },  // Prisia Nasution - Susi Susanti
    { pemeran_id: 3, film_id: 9 },  // Raisa Anggiani - Dilan 1990
  ]);
};
