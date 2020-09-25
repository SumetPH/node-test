const route = require("express").Router();
const image = require("../../config/db").get("image");

// POST upload images.
// REQ product_id
route.post("/:product_id", (req, res, next) => {
  try {
    req.files.forEach(async (file) => {
      // insert image
      const newImage = await image.insert({
        product_id: req.params.product_id,
        path: file.path,
        created_at: new Date(),
      });
    });
    return res.json({ msg: "images uploaded" });
  } catch (err) {
    return next(err);
  }
});

// DELETE a image by id.
// REQ image_id
route.delete("/:image_id", async (req, res, next) => {
  try {
    // delete image
    const deleteImage = await image.findOneAndDelete({
      _id: req.params.image_id,
    });
    return res.json({ msg: "image deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = route;
