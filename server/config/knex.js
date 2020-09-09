const key = require("../key");

const knex = require("knex")({
  client: "pg",
  connection: {
    database: "node_store",
    user: "sumetph",
    password: "root",
  },
});

module.exports = knex;
