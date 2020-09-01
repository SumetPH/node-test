const key = require("../key");

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    database: key.psqlDatabse,
    user: key.psqlUser,
    password: key.psqlPassword,
  },
});

module.exports = knex;
