/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("pemeran_film", function(table){
    table.increments()
    table.integer('film_id').notNullable().unsigned()
    table.integer('pemeran_id').notNullable().unsigned()
    table.foreign('film_id').references("film.id").onDelete('cascade')
    table.foreign('pemeran_id').references('pemeran.id').onDelete('cascade')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("pemeran_film")
};
