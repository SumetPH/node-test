const route = require("express").Router();
const upload = require("../config/upload");

// POST create
route.post("/create", upload.array("img"), (req, res) => {
  if (req.files) {
    return res.json(req.files);
  }
  return res.json("no file");
});
module.exports = route;
