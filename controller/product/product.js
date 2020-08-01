const route = require("express").Router();
const knex = require("../../config/knex");
const joi = require("@hapi/joi");
const schema = joi.object({
  name: joi.string().required(),
  category: joi.string().required(),
  price: joi.string().required(),
  description: joi.string().required(),
  quantity: joi.string().required(),
});

// GET all products.
route.get("/", async (_req, res) => {
  try {
    const products = await knex("product").select("*");
    const images = await knex("image").select("*");
    const data = products.map((product) => {
      const imagesFilter = images.filter(
        (image) => image.product_id === product.id
      );
      product.images = imagesFilter;
      return product;
    });
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET a product by id.
route.get("/:id", async (req, res, next) => {
  try {
    const product = await knex("product")
      .select("*")
      .where("id", "=", req.params.id);

    const images = await knex("image")
      .select("*")
      .where("product_id", "=", product[0].id);

    product[0].images = images;
    return res.json(product[0]);
  } catch (err) {
    next(err);
  }
});

// POST create product.
route.post("/", async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    await knex("product").insert({
      ...req.body,
      created_at: new Date(),
    });
    return res.json("product created.");
  } catch (err) {
    next(err);
  }
});

// PUT update product information.
route.put("/:id", async (req, res, next) => {
  try {
    await knex("product")
      .where("id", "=", req.params.id)
      .update({
        ...req.body,
        updated_at: new Date(),
      });
    return res.json("product updated.");
  } catch (err) {
    next(err);
  }
});

// DELETE a product by id.
route.delete("/:id", async (req, res, next) => {
  try {
    await knex("product").where("id", "=", req.params.id).del();
    return res.json("product deleted.");
  } catch (err) {
    next(err);
  }
});

module.exports = route;
