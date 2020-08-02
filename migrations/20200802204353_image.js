exports.up = function (knex) {
  return knex.schema.createTable("image", (table) => {
    table.increments("id").primary();
    table
      .integer("product_id")
      .unsigned()
      .references("id")
      .inTable("product")
      .onUpdate("cascade")
      .onDelete("cascade");
    table.text("path").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("image");
};
