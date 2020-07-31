const express = require("express");
const multer = require("./config/multer");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 8000;

// config
app.use("/upload", express.static("upload"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer.array("image"));
app.use(morgan("dev"));

// middleware
const { isAuth, notFund, errorHandle } = require("./config/middleware");

// route
const test = require("./controller/test");
const buyer = require("./controller/buyer/buyer");
const product = require("./controller/product/product");
const image = require("./controller/product/image");

app.use("/test", test);
app.use("/buyer", buyer);
app.use("/product", isAuth, product);
app.use("/product/image", isAuth, image);

app.get("/check", isAuth, (req, res) => {
  return res.json(req.user);
});

app.use(notFund);
app.use(errorHandle);

app.listen(port, () => console.log(`Server stared port : ${port}`));
