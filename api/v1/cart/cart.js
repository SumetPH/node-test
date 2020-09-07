const router = require("express").Router();
const knex = require("../../../config/knex");

// GET items in cart.
// REQ user_id
router.get("/", async (req, res, next) => {
  try {
    const carts = await knex("cart")
      .where("user_id", "=", req.user.id)
      .select("*")
      .orderBy("id");
    return res.json({ carts: carts });
  } catch (err) {
    next(err);
  }
});

// POST item in cart.
// REQ user_id, product_id, quantity
router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    await knex("cart").insert({
      user_id: req.user.id,
      product_id: req.body.product_id,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      image: req.body.image,
      created_at: new Date(),
    });
    return res.json({ msg: "cart created" });
  } catch (err) {
    next(err);
  }
});

// PUT quantity of item in cart
router.put("/:cart_id", async (req, res, next) => {
  try {
    await knex("cart").where("cart.id", req.params.cart_id).update({
      quantity: req.body.quantity,
    });

    return res.json({ msg: "cart updated" });
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
