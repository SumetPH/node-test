const route = require("express").Router();
const knex = require("../../../config/knex");
const joi = require("@hapi/joi");
const comment = require("../../../config/db").get("comment");

// GET all comments.
route.get("/", async (_req, res, next) => {
  try {
    const comments = comment.find({});
    return res.json({ comments: comments });
  } catch (err) {
    return next(err);
  }
});

// GET comments by product_id
route.get("/:product_id", (req, res, next) => {
  try {
    const findComments = comment.find({ product_id: req.params.product_id });
    return res.json({ comments: findComments });
  } catch (err) {
    return next(err);
  }
});

// POST a comment by product_id.
// REQ product_id, user_id, description, rating
route.post("/:product_id", async (req, res, next) => {
  try {
    const commentSchema = joi.object({
      description: joi.string().required(),
      rating: joi.number().required(),
    });

    await commentSchema.validateAsync(req.body);
    const insertComment = comment.insert({
      product_id: req.params.product_id,
      user_id: req.user.id,
      description: req.body.description,
      rating: req.body.rating,
      created_at: new Date(),
    });
    return res.json({ msg: "comment created", insertComment });
  } catch (err) {
    return next(err);
  }
});

// PUT a comment by id.
// REQ comment_id, description, rating
route.put("/:comment_id", async (req, res, next) => {
  try {
    const commentSchema = joi.object({
      description: joi.string().required(),
      rating: joi.number().required(),
    });
    await commentSchema.validateAsync(req.body);

    const updateComment = comment.findOneAndUpdate(
      { _id: req.params.comment_id },
      {
        $set: {
          updated_at: new Date(),
          ...req.body,
        },
      }
    );
    return res.json({ msg: "comment updated", updateComment });
  } catch (err) {
    return next(err);
  }
});

// DELETE a comment by id.
// REQ comment_id
route.delete("/:comment_id", async (req, res, next) => {
  try {
    const deleteComment = comment.findOneAndDelete({
      _id: req.params.comment_id,
    });
    return res.json({ msg: "comment deleted", deleteComment });
  } catch (err) {
    return next(err);
  }
});

module.exports = route;
