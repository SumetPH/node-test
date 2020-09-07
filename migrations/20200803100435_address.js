exports.up = function (knex) {
  return knex.schema.createTable("address", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("user")
      .onUpdate("cascade")
      .onDelete("cascade")
      .notNullable();
    table.string("name").notNullable();
    table.string("address").notNullable();
    table.string("district").notNullable();
    table.string("province").notNullable();
    table.string("zip").notNullable();
    table.integer("phone").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("address");
};
