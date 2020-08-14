const user = require("./controller/user/user");
const product = require("./controller/product/product");
const productImage = require("./controller/product/image");
const comment = require("./controller/comment/comment");
const cart = require("./controller/cart/cart");
const shipment = require("./controller/shipment/shipment");
const order = require("./controller/order/order");

const { isAuth, notFund, errorHandle } = require("./middleware");

module.exports = app => {
  // route
  app.use("/user", user);
  app.use("/product", product);
  app.use("/product/image", productImage);
  app.use("/comment", isAuth, comment);
  app.use("/cart", isAuth, cart);
  app.use("/shipment", isAuth, shipment);
  app.use("/order", isAuth, order);

  // middleware
  app.use(notFund);
  app.use(errorHandle);
};
