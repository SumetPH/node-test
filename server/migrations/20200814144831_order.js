exports.up = function (knex) {
  return knex.schema.createTable("order", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("user")
      .onUpdate("cascade")
      .onDelete("cascade");
    table
      .integer("address_id")
      .unsigned()
      .references("id")
      .inTable("address")
      .onUpdate("cascade")
      .onDelete("cascade")
      .notNullable();
    table.integer("total").notNullable();
    table.integer("status").defaultTo(0);
    table.string("tracking_number");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("order");
};
