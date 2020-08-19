exports.up = function(knex) {
  return knex.schema.createTable("user", table => {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("password");
    table.string("email");
    table.string("provider");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user");
};
