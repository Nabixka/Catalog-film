/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("sutradara_film", function(table){
    table.increments()
    table.integer("film_id").notNullable().unsigned()
    table.integer("sutradara_id").notNullable().unsigned()
    
    table.foreign("film_id").references("film.id").onDelete("cascade")
    table.foreign("sutradara_id").references("sutradara.id").onDelete("cascade")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("sutradara_film")
};
