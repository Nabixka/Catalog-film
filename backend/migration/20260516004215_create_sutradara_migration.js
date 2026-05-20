/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("sutradara", function(table){
    table.increments()
    table.string("name").notNullable()
    table.text("image").notNullable()
    table.text("description").notNullable()
    table.date("tanggal_lahir").notNullable()
    table.string("tempat_asal").notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("sutradara")
};
