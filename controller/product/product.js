const route = require("express").Router();
const knex = require("../../config/knex");

// GET all products.
route.get("/", async (_req, res) => {
  const products = await knex("product").select("*");
  const images = await knex("image").select("*");
  const data = products.map((product) => {
    const imagesFilter = images.filter(
      (image) => image.product_id === product.id
    );
    product.images = imagesFilter;
    return product;
  });
  res.json(data);
});

// POST create product.
route.post("/", (req, res, next) => {
  knex("product")
    .insert({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      description: req.body.description,
    })
    .then(() => {
      return res.json("product created.");
    })
    .catch((err) => next(err));
});

// GET a product by id.
route.get("/:id", (req, res, next) => {
  knex("product")
    .select("*")
    .where("id", "=", req.params.id)
    .then((product) => {
      knex("image")
        .select("*")
        .where("product_id", "=", product[0].id)
        .then((productAndImage) => {
          product[0].images = productAndImage;
          return res.json(product);
        })
        .catch((err) => next(err));
    });
});

// PUT update product information.
route.put("/:id", (req, res, next) => {
  knex("product")
    .where("id", "=", req.params.id)
    .update({ ...req.body })
    .then(() => {
      return res.json("product updated.");
    })
    .catch((err) => next(err));
});

// DELETE a product by id.
route.delete("/:id", (req, res, next) => {
  knex("product")
    .where("id", "=", req.params.id)
    .del()
    .then(() => {
      return res.json("product deleted.");
    })
    .catch((err) => next(err));
});

module.exports = route;
