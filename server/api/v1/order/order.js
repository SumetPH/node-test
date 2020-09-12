const router = require("express").Router();
const knex = require("../../../config/knex");
const order = require("../../../config/db").get("order");
const orderItem = require("../../../config/db").get("order_item");
const cart = require("../../../config/db").get("cart");

// GET all order
router.get("/", async (req, res, next) => {
  try {
    const orders = await knex("order")
      .select("*")
      .where("user_id", "=", req.user.id);

    const orderItems = await knex("order_item")
      .select("*")
      .where("user_id", "=", req.user.id);

    let orderAll = [];
    orders.forEach((order) => {
      const orderItemsFiller = orderItems.filter(
        (item) => item.order_id === order.id
      );
      orderAll.push({ ...order, products: orderItemsFiller });
    });

    return res.json({ orders: orderAll });
  } catch (err) {
    next(err);
  }
});

// POST order
// REQ address_id, shipment, payment
router.post("/", async (req, res, next) => {
  try {
    const inertOrder = await order.insert({
      user_id: req.user._id,
      address_id: req.body.address_id,
      shipping: req.body.shipping,
      payment: req.body.payment,
    });

    const carts = await cart.find({ user_id: req.user._id });

    carts.forEach(async (item) => {
      await orderItem.insert({
        order_id: inertOrder._id,
        user_id: req.user._id,
        product_id: item.product_id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        created_at: new Date(),
      });
    });

    await cart.remove({ user_id: req.user._id });

    return res.json(inertOrder);
  } catch (err) {
    return next(err);
  }
});

// PUT update status by id
// REQ order_id, status
router.put("/:order_id", async (req, res, next) => {
  try {
    await knex("order")
      .update({ ...req.body, updated_at: new Date() })
      .where("id", "=", req.params.order_id);
    return res.json({ msg: "order status updated" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
