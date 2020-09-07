const route = require("express").Router();
const knex = require("../../../config/knex");
const joi = require("@hapi/joi");
const schema = joi.object({
  name: joi.string().required(),
  address: joi.string().required(),
  district: joi.string().required(),
  province: joi.string().required(),
  zip: joi.string().required(),
  phone: joi.number().required(),
});

// GET all
// REQ user_id
route.get("/", async (req, res, next) => {
  try {
    const address = await knex("address")
      .select("*")
      .where("user_id", "=", req.user.id);
    return res.json({ address: address });
  } catch (err) {
    next(err);
  }
});

// POST a address
// REQ user_id
route.post("/", async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    await knex("address").insert({
      user_id: req.user.id,
      ...req.body,
    });
    return res.json({ msg: "address created" });
  } catch (err) {
    next(err);
  }
});

// PUT a address by id
// REQ address_id
route.put("/:address_id", async (req, res, next) => {
  try {
    await knex("address")
      .where("id", "=", req.params.address_id)
      .update({
        ...req.body,
      });
    return res.json({ msg: "address updated" });
  } catch (err) {
    next(err);
  }
});

// DELETE a address by id
// REQ address_id
route.delete("/:address_id", async (req, res, next) => {
  try {
    await knex("address").where("id", "=", req.params.address_id).del();
    return res.json({ msg: "address deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = route;
