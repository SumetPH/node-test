const { Pool } = require("pg");

const db = new Pool({
  user: "root",
  host: "localhost",
  database: "sumetph",
  password: "root",
});

module.exports = db;
