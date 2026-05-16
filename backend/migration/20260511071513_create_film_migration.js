/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('film', function(table){
    table.increments()
    table.string("title").notNullable()
    table.text("image").nullable()
    table.text("description").notNullable()
    table.datetime("tanggal_rilis").nullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('film')
};
