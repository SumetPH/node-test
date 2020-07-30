const route = require("express").Router();
const multer = require("../config/multer");

// POST create
route.post("/create", multer.array("img"), (req, res) => {
  if (req.files) {
    return res.json(req.files);
  }
  return res.json("no file");
});
module.exports = route;
