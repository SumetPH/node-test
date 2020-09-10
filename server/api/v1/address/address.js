const route = require("express").Router();
const knex = require("../../../config/knex");
const joi = require("@hapi/joi");
const address = require("../../../config/db").get("address");

// GET all
// REQ user_id
route.get("/", async (req, res, next) => {
  try {
    const addressFind = await address.find({ user_id: req.user.id });
    return res.json({ address: addressFind });
  } catch (err) {
    next(err);
  }
});

// GET one by id
route.get("/:id", async (req, res, next) => {
  try {
    const findAddress = await address.findOne({ _id: req.params.id });
    return res.json({ address: findAddress });
  } catch (err) {
    return next(err);
  }
});

// POST a address
// REQ user_id
route.post("/", async (req, res, next) => {
  try {
    const addressSchema = joi.object({
      name: joi.string().required(),
      address: joi.string().required(),
      district: joi.string().required(),
      province: joi.string().required(),
      zip: joi.number().required(),
      phone: joi.number().required(),
    });
    await addressSchema.validateAsync(req.body);

    console.log("test");
    const insertAddress = await address.insert({
      name: req.body.name,
      address: req.body.address,
      district: req.body.district,
      province: req.body.province,
      zip: req.body.zip,
      phone: req.body.phone,
      user_id: req.user.id,
      created_at: new Date(),
    });
    return res.json({ msg: "address created", insertAddress });
  } catch (err) {
    next(err);
  }
});

// PUT a address by id
// REQ address_id
route.put("/:address_id", async (req, res, next) => {
  try {
    const addressSchema = joi.object({
      name: joi.string(),
      address: joi.string(),
      district: joi.string(),
      province: joi.string(),
      zip: joi.string(),
      phone: joi.number(),
    });
    await addressSchema.validateAsync(req.body);

    const updateCart = await address.findOneAndUpdate(
      { _id: req.params.address_id },
      {
        $set: {
          ...req.body,
          updated_at: new Date(),
        },
      }
    );
    return res.json({ msg: "address updated", updateCart });
  } catch (err) {
    next(err);
  }
});

// DELETE a address by id
// REQ address_id
route.delete("/:address_id", async (req, res, next) => {
  try {
    const deleteAddress = await address.findOneAndDelete({
      _id: req.params.address_id,
    });
    return res.json({ msg: "address deleted", deleteAddress });
  } catch (err) {
    next(err);
  }
});

module.exports = route;
