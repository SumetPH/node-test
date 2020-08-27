const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "sumetph",
    password: "root",
    database: "sumetph"
  }
});

module.exports = knex;
