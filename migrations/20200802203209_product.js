exports.up = function (knex) {
  return knex.schema.createTable("product", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("category").notNullable();
    table.text("description").notNullable();
    table.integer("price").notNullable();
    table.integer("quantity").notNullable();
    table.integer("sold").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("product");
};
