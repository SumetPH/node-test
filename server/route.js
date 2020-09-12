const path = require("path");
const user = require("./api/v1/user/user");
const product = require("./api/v1/product/product");
const productImage = require("./api/v1/product/image");
// const comment = require("./api/v1/comment/comment");
const cart = require("./api/v1/cart/cart");
const address = require("./api/v1/address/address");
const order = require("./api/v1/order/order");

const { isAuth, notFund, errorHandle } = require("./middleware");

module.exports = (app) => {
  // route
  app.use("/api/v1/user", user);
  app.use("/api/v1/product", product);
  app.use("/api/v1/product/image", productImage);
  // app.use("/api/v1/comment", isAuth, comment);
  app.use("/api/v1/cart", isAuth, cart);
  app.use("/api/v1/address", isAuth, address);
  app.use("/api/v1/order", isAuth, order);

  // client
  if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
      return res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
    });
  }

  // middleware
  app.use(notFund);
  app.use(errorHandle);
};
