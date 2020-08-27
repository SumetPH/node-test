const path = require("path");
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
  app.use("/api/v1/user", user);
  app.use("/api/v1/product", product);
  app.use("/api/v1/product/image", productImage);
  app.use("/api/v1/comment", isAuth, comment);
  app.use("/api/v1/cart", isAuth, cart);
  app.use("/api/v1/shipment", isAuth, shipment);
  app.use("/api/v1/order", isAuth, order);

  // client
  if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
      return res.sendFile(
        path.join(__dirname, "../", "client", "dist", "index.html")
      );
    });
  }

  // middleware
  app.use(notFund);
  app.use(errorHandle);
};
