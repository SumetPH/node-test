const route = require("express").Router();
const db = require("../config/db");

route.get("/", (req, res) => {
  return res.json(req.user);
});

module.exports = route;
