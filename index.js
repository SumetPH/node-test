const port = process.env.PORT || 8000;
const express = require("express");
const morgan = require("morgan");
const multer = require("./config/multer");
const route = require("./route");
const passport = require("passport");
const passportFacebook = require("./config/passportFacebook");

// config
const app = express();
app.use("/upload", express.static("upload"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer.array("image"));
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use(passportFacebook);

// route
app.get("/", (req, res) => {
  return res.json("Hollo World. 🌏");
});

route(app);

app.listen(port, () =>
  console.log(`😎 Server stared port : http://localhost:${port}`)
);
