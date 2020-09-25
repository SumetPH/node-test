const router = require("express").Router();
const cart = require("../../config/db").get("cart");

// GET items in cart.
// REQ user_id
router.get("/", async (req, res, next) => {
  try {
    const carts = await cart.find({ user_id: req.user._id });
    return res.json(carts);
  } catch (err) {
    return next(err);
  }
});

// POST item in cart.
// REQ user_id, product_id, quantity
router.post("/", async (req, res, next) => {
  try {
    const insertCart = await cart.insert({
      user_id: req.user._id,
      product_id: req.body.product_id,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      image: req.body.image,
      created_at: new Date(),
    });
    return res.json(insertCart);
  } catch (err) {
    return next(err);
  }
});

// PUT quantity of item in cart
router.put("/:cart_id", async (req, res, next) => {
  try {
    const updateCart = await cart.findOneAndUpdate(
      { _id: req.params.cart_id },
      {
        $set: {
          quantity: req.body.quantity,
          updated_at: new Date(),
        },
      }
    );

    return res.json(updateCart);
  } catch (err) {
    next(err);
  }
});

// DELETE item in cart by id.
// REQ user_id, cart_id
router.delete("/:cart_id", async (req, res, next) => {
  try {
    const deleteCart = await cart.findOneAndDelete({ _id: req.params.cart_id });
    return res.json(deleteCart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
