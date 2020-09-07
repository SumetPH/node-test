const router = require("express").Router();
const knex = require("../../../config/knex");
const joi = require("@hapi/joi");
const schema = joi.object({
  quantity: joi.number().required(),
});

// GET items in cart.
// REQ user_id
router.get("/", async (req, res, next) => {
  try {
    const carts = await knex("cart")
      .where("user_id", "=", req.user.id)
      .join("product", "cart.product_id", "=", "product.id")
      .select(
        "cart.id",
        "cart.product_id",
        "cart.quantity",
        "product.name",
        "product.price"
      );
    const images = await knex("image").select("*");
    const data = carts.map((cart) => {
      const imageFilter = images.filter(
        (img) => img.product_id === cart.product_id
      );
      cart.images = imageFilter;
      return cart;
    });
    return res.json({ carts: data });
  } catch (err) {
    next(err);
  }
});

// POST item in cart.
// REQ user_id, product_id, quantity
router.post("/:product_id", async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    const checkCart = await knex("cart")
      .select("*")
      .where("user_id", "=", req.user.id)
      .andWhere("product_id", "=", req.params.product_id);
    if (checkCart.length === 0) {
      await knex("cart").insert({
        ...req.body,
        user_id: req.user.id,
        product_id: req.params.product_id,
        created_at: new Date(),
      });
      return res.json({ msg: "cart created" });
    } else {
      await knex("cart")
        .where("user_id", "=", req.user.id)
        .andWhere("product_id", "=", req.params.product_id)
        .update({
          ...req.body,
          updated_at: new Date(),
        });
      return res.json({ msg: "cart updated" });
    }
  } catch (err) {
    next(err);
  }
});

// DELETE item in cart by id.
// REQ user_id, cart_id
router.delete("/:cart_id", async (req, res, next) => {
  try {
    await knex("cart")
      .where("user_id", "=", req.user.id)
      .andWhere("id", "=", req.params.cart_id)
      .del();
    return res.json({ msg: "cart deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
