/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('pemeran_film').del()
  await knex('pemeran_film').insert([
    { pemeran_id: 24, film_id: 1 }, 
    { pemeran_id: 9, film_id: 2 },
    { pemeran_id: 10, film_id: 2 }, 
    { pemeran_id: 13, film_id: 3 }, 
    { pemeran_id: 3, film_id: 5 },  
    { pemeran_id: 5, film_id: 5 }, 
    { pemeran_id: 33, film_id: 5 }, 

    { pemeran_id: 6, film_id: 6 }, 
    { pemeran_id: 7, film_id: 6 },  
    { pemeran_id: 12, film_id: 7 }, 
    { pemeran_id: 13, film_id: 7 },
    { pemeran_id: 15, film_id: 7 }, 
    { pemeran_id: 25, film_id: 7 }, 
    { pemeran_id: 25, film_id: 8 }, 
    { pemeran_id: 8, film_id: 9 }, 

    { pemeran_id: 9, film_id: 10 }, 
    { pemeran_id: 10, film_id: 10 }, 
    { pemeran_id: 24, film_id: 10 }
  ]);
};
