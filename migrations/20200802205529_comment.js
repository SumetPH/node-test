exports.up = function(knex) {
  return knex.schema.createTable("comment", table => {
    table.increments("id").primary();
    table
      .integer("product_id")
      .unsigned()
      .references("id")
      .inTable("product")
      .onUpdate("cascade")
      .onDelete("cascade")
      .notNullable();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("user")
      .onUpdate("cascade")
      .onDelete("cascade")
      .notNullable();
    table.text("description").notNullable();
    table.integer("rating").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comment");
};
