const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

// config
app.use(express.json());
app.use(express.urlencoded());
app.use("/upload", express.static("upload"));

// middleware
const { isAuth } = require("./middleware/auth");

// route
const test = require("./controller/test");
const buyer = require("./controller/buyer");
const product = require("./controller/product");

app.use("/test", isAuth, test);
app.use("/buyer", buyer);
app.use("/product", isAuth, product);

app.get("/", (_req, res) => {
  return res.json("Hello World.");
});

app.listen(port, () => console.log(`Server stared port : ${port}`));
