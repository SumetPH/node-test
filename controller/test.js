const route = require("express").Router();
const knex = require("../config/knex");

route.get("/", (req, res) => {
  res.json("/test");
});

module.exports = route;
