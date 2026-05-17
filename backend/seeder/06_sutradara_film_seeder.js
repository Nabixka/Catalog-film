/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('sutradara_film').del()
  await knex('sutradara_film').insert([
    { sutradara_id: 1, film_id: 1 }, // Riri Riza - Laskar Pelangi
    { sutradara_id: 3, film_id: 2 }, // Gareth Evans - The Raid
    { sutradara_id: 5, film_id: 3 }, // Mira Lesmana - AADC
    { sutradara_id: 4, film_id: 4 }, // Joko Anwar - Pengabdi Setan
    { sutradara_id: 2, film_id: 5 }, // Hanung Bramantyo - Habibie & Ainun
    { sutradara_id: 6, film_id: 6 }, // Raditya Dika - Comic 8
    { sutradara_id: 9, film_id: 7 }, // Angga Dwimas - NKCTHI
    { sutradara_id: 10, film_id: 8 }, // Ifa Isfansyah - Susi Susanti
    { sutradara_id: 7, film_id: 9 }, // Ernest Prakasa - Dilan 1990
    { sutradara_id: 4, film_id: 10 }, // Joko Anwar - Gundala
  ]);
};
