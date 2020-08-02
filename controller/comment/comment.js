const route = require("express").Router();
const knex = require("../../config/knex");
const joi = require("@hapi/joi");
const schema = joi.object({
  description: joi.string().required(),
  rating: joi.number().required(),
});

// GET all comments.
route.get("/", async (_req, res, next) => {
  try {
    const comments = await knex("comment").select("*");
    return res.json(comments);
  } catch (err) {
    next(err);
  }
});

// POST a comment by product_id.
route.post("/:product_id", async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    await knex("comment").insert({
      product_id: req.params.product_id,
      user_id: req.user.id,
      created_at: new Date(),
      ...req.body,
    });
    return res.json("comment created.");
  } catch (err) {
    next(err);
  }
});

// PUT a comment by id.
route.put("/:id", async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    await knex("comment")
      .where("id", "=", req.params.id)
      .update({
        updated_at: new Date(),
        ...req.body,
      });
    return res.json("comment updated.");
  } catch (err) {
    next(err);
  }
});

// DELETE a comment by id.
route.delete("/:id", async (req, res, next) => {
  try {
    await knex("comment").where("id", "=", req.params.id).del();
    return res.json("comment deleted.");
  } catch (err) {
    next(err);
  }
});

module.exports = route;
