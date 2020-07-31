const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

// config
const multer = require("./config/multer");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", express.static("upload"));
app.use(multer.array("image"));

// middleware
const { isAuth } = require("./config/middleware");

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

app.listen(port, () => console.log(`Server stared port : ${port}`));
