const buyer = require("./controller/buyer/buyer");
const product = require("./controller/product/product");
const productImage = require("./controller/product/image");
const comment = require("./controller/comment/comment");
const cart = require("./controller/cart/cart");

const { isAuth, notFund, errorHandle } = require("./middleware");

module.exports = (app) => {
  // route
  app.use("/buyer", buyer);
  app.use("/product", isAuth, product);
  app.use("/product/image", isAuth, productImage);
  app.use("/comment", isAuth, comment);
  app.use("/cart", isAuth, cart);

  // middleware
  app.use(notFund);
  app.use(errorHandle);
};
