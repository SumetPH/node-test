const route = require("express").Router();
const knex = require("../../config/knex");

// POST upload images.
route.post("/:product_id", (req, res, next) => {
  req.files.forEach((file) => {
    knex("image")
      .insert({ product_id: req.params.product_id, path: file.path })
      .catch((err) => next(err));
  });
  return res.json("images uploaded.");
});

// DELETE image by id.
route.delete("/:product_id", (req, res, next) => {
  knex("image")
    .where("product_id", "=", req.params.product_id)
    .del()
    .catch((err) => next(err));
  return res.json("image deleted.");
});

module.exports = route;
