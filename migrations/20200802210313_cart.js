exports.up = function (knex) {
  return knex.schema.createTable("cart", (table) => {
    table.increments("id").primary();
    table
      .integer("product_id")
      .unsigned()
      .references("id")
      .inTable("product")
      .onUpdate("cascade")
      .onDelete("cascade");
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("user")
      .onUpdate("cascade")
      .onDelete("cascade");
    table.integer("quantity").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cart");
};
