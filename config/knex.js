const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "sumetph",
  },
});

module.exports = knex;
