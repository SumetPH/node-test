const router = require("express").Router();
const joi = require("@hapi/joi");
const order = require("../../../config/db").get("order");
const orderItem = require("../../../config/db").get("order_item");
const cart = require("../../../config/db").get("cart");

// GET all order
router.get("/", async (req, res, next) => {
  try {
    const orders = await order.find({ user_id: req.user._id });
    const orderItems = await orderItem.find({ user_id: req.user._id });
    const data = orders.map((order) => {
      const items = orderItems.filter(
        (item) => item.order_id.toString() === order._id.toString()
      );
      order.items = items;
      return order;
    });

    return res.json(data);
  } catch (err) {
    next(err);
  }
});

// POST order
// REQ address_id, shipment, payment
router.post("/", async (req, res, next) => {
  try {
    const orderSchema = joi.object({
      address_id: joi.string().required(),
      shipping: joi.string().required(),
      payment: joi.string().required(),
    });
    await orderSchema.validateAsync();

    const inertOrder = await order.insert({
      user_id: req.user._id,
      address_id: req.body.address_id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      status: "0",
      created_at: new Date(),
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
    const orderSchema = joi.object({
      status: joi.number().required(),
    });
    await orderSchema.validateAsync();

    const updateOrder = await order.findOneAndUpdate(
      { _id: req.params.order_id },
      { $set: { status: req.body.status, updated_at: new Date() } }
    );
    return res.json(updateOrder);
  } catch (err) {
    return next(err);
  }
});

// DELETE order by order_id
// REQ order_id
router.delete("/:order_id", async (req, res, next) => {
  try {
    const deleteOrder = await order.findOneAndDelete({
      _id: req.params.order_id,
    });
    return res.json(deleteOrder);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
