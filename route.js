const buyer = require("./controller/buyer/buyer");
const product = require("./controller/product/product");
const image = require("./controller/product/image");

const { isAuth, notFund, errorHandle } = require("./middleware");

module.exports = (app) => {
  // route
  app.use("/buyer", buyer);
  app.use("/product", isAuth, product);
  app.use("/product/image", isAuth, image);

  // middleware
  app.use(notFund);
  app.use(errorHandle);
};
