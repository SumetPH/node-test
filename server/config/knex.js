const { development } = require("../knexfile");

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: development.connection.user,
    password: development.connection.password,
    database: development.connection.database
  }
});

module.exports = knex;
