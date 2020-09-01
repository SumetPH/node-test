const route = require("express").Router();
const knex = require("../../../config/knex");

// POST upload images.
// REQ product_id
route.post("/:product_id", (req, res, next) => {
  try {
    req.files.forEach(async (file) => {
      await knex("image").insert({
        product_id: req.params.product_id,
        path: file.path,
      });
    });
    return res.json({ msg: "images uploaded" });
  } catch (err) {
    next(err);
  }
});

// DELETE a image by id.
// REQ product_id
route.delete("/:product_id", async (req, res, next) => {
  try {
    await knex("image").where("id", "=", req.params.product_id).del();
    return res.json({ msg: "image deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = route;
