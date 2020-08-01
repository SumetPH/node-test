const route = require("express").Router();
const knex = require("../../config/knex");

// POST upload images.
route.post("/:product_id", (req, res, next) => {
  try {
    req.files.forEach(async (file) => {
      await knex("image").insert({
        product_id: req.params.product_id,
        path: file.path,
      });
    });
    return res.json("images uploaded.");
  } catch (err) {
    next(err);
  }
});

// DELETE a image by id.
route.delete("/:product_id", async (req, res, next) => {
  try {
    await knex("image").where("id", "=", req.params.product_id).del();
    return res.json("image deleted.");
  } catch (err) {
    next(err);
  }
});

module.exports = route;
