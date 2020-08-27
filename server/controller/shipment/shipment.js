const route = require("express").Router();
const knex = require("../../config/knex");
const joi = require("@hapi/joi");
const schema = joi.object({
  name: joi.string().required(),
  address: joi.string().required(),
  district: joi.string().required(),
  province: joi.string().required(),
  zip: joi.string().required(),
  phone: joi.number().required()
});

// GET all
// REQ user_id
route.get("/", async (req, res, next) => {
  try {
    const shipments = await knex("shipment")
      .select("*")
      .where("user_id", "=", req.user.id);
    return res.json(shipments);
  } catch (err) {
    next(err);
  }
});

// POST a shipment
// REQ user_id
route.post("/", async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    await knex("shipment").insert({
      user_id: req.user.id,
      ...req.body
    });
    return res.json("shipment created.");
  } catch (err) {
    next(err);
  }
});

// PUT a shipment by id
// REQ shipment_id
route.put("/:id", async (req, res, next) => {
  try {
    await knex("shipment")
      .where("id", "=", req.params.id)
      .update({
        ...req.body
      });
    return res.json("shipment updated.");
  } catch (err) {
    next(err);
  }
});

// DELETE a shipment by id
// REQ shipment_id
route.delete("/:id", async (req, res, next) => {
  try {
    await knex("shipment")
      .where("id", "=", req.params.id)
      .del();
    return res.json("shipment deleted.");
  } catch (err) {
    next(err);
  }
});

module.exports = route;
