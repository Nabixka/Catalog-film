/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("genre_film", function(table){
    table.increments()
    table.integer('film_id').notNullable().unsigned()
    table.integer('genre_id').notNullable().unsigned()

    table.foreign('film_id').references('film.id').onDelete("cascade")
    table.foreign('genre_id').references('genre.id').onDelete("cascade")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("genre_film")
};
