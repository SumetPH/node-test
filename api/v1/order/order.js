const router = require("express").Router();
const knex = require("../../../config/knex");

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
// REQ shipment_id
router.post("/", async (req, res, next) => {
  try {
    const order = await knex("order")
      .insert({
        user_id: req.user.id,
        shipment_id: req.body.shipment_id,
      })
      .returning("*");

    const cart = await knex("cart")
      .select("*")
      .where("user_id", "=", req.user.id);

    cart.forEach(async (item) => {
      await knex("order_item").insert({
        order_id: order[0].id,
        user_id: req.user.id,
        product_id: item.product_id,
        quantity: item.quantity,
      });
    });

    await knex("cart").delete().where("user_id", "=", req.user.id);

    return res.json({ msg: "order created" });
  } catch (err) {
    next(err);
  }
});

// PUT update status by id
// REQ order_id, status
router.put("/:order_id", async (req, res, next) => {
  try {
    await knex("order")
      .update({ status: req.body.status, updated_at: new Date() })
      .where("id", "=", req.params.order_id);
    return res.json({ msg: "order status updated" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
