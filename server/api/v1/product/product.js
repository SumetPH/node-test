const route = require("express").Router();
const joi = require("@hapi/joi");
const product = require("../../../config/db").get("product");
const image = require("../../../config/db").get("image");

// GET all products.
route.get("/", async (_req, res, next) => {
  try {
    // find products
    const products = await product.find({});
    const images = await image.find({});

    // add images to product
    const data = products.map((product) => {
      const filterImages = images.filter(
        (image) => image.product_id.toString() === product._id.toString()
      );
      product.images = filterImages;
      return product;
    });
    return res.json({ products: data });
  } catch (err) {
    return next(err);
  }
});

// GET a product by id.
// REQ product_id
route.get("/:id", async (req, res, next) => {
  try {
    // find product
    const findProduct = await product.findOne({ _id: req.params.id });
    const findImages = await image.find({ product_id: req.params.id });
    findProduct.images = findImages;
    return res.json({ product: findProduct });
  } catch (err) {
    return next(err);
  }
});

// POST create product.
// REQ name, category, price, description, quantity
route.post("/", async (req, res, next) => {
  try {
    // validate
    const productSchema = joi.object({
      name: joi.string().required(),
      category: joi.string().required(),
      price: joi.string().required(),
      description: joi.string().required(),
      quantity: joi.string().required(),
    });
    await productSchema.validateAsync(req.body);

    // insert product
    const insertProduct = await product.insert({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity,
      created_at: new Date(),
    });
    return res.json({ msg: "product created.", insertProduct });
  } catch (err) {
    return next(err);
  }
});

// PUT update product information.
// REQ name, category, price, description, quantity
route.put("/:id", async (req, res, next) => {
  try {
    // validate
    const productSchema = joi.object({
      name: joi.string(),
      category: joi.string(),
      price: joi.string(),
      description: joi.string(),
      quantity: joi.string(),
    });
    await productSchema.validateAsync(req.body);

    // update product
    const updateProduct = await product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body, updated_at: new Date() } }
    );
    return res.json({ msg: "product updated", updateProduct });
  } catch (err) {
    return next(err);
  }
});

// DELETE a product by id.
// REQ product_id
route.delete("/:id", async (req, res, next) => {
  try {
    // delete product
    const deleteProduct = await product.findOneAndDelete({
      _id: req.params.id,
    });
    return res.json({ msg: "product deleted", deleteProduct });
  } catch (err) {
    return next(err);
  }
});

module.exports = route;
