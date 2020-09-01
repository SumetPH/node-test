const route = require("express").Router();
const knex = require("../../../config/knex");
const joi = require("@hapi/joi");
const schema = joi.object({
  description: joi.string().required(),
  rating: joi.number().required(),
});

// GET all comments.
route.get("/", async (_req, res, next) => {
  try {
    const comments = await knex("comment").select("*");
    return res.json({ comments: comments });
  } catch (err) {
    next(err);
  }
});

// POST a comment by product_id.
// REQ product_id, user_id, description, rating
route.post("/:product_id", async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    await knex("comment").insert({
      product_id: req.params.product_id,
      user_id: req.user.id,
      created_at: new Date(),
      ...req.body,
    });
    return res.json({ msg: "comment created" });
  } catch (err) {
    next(err);
  }
});

// PUT a comment by id.
// REQ comment_id, description, rating
route.put("/:comment_id", async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    await knex("comment")
      .where("id", "=", req.params.comment_id)
      .update({
        updated_at: new Date(),
        ...req.body,
      });
    return res.json({ msg: "comment updated" });
  } catch (err) {
    next(err);
  }
});

// DELETE a comment by id.
// REQ comment_id
route.delete("/:comment_id", async (req, res, next) => {
  try {
    await knex("comment").where("id", "=", req.params.comment_id).del();
    return res.json({ msg: "comment deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = route;