const route = require("express").Router();
const knex = require("../../config/knex");
const key = require("../../config/key");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// POST register
route.post("/register", async (req, res, next) => {
  try {
    const checkEmail = await knex("buyer")
      .select("*")
      .where("email", "=", req.body.email);
    if (checkEmail.length > 0) next(new Error("Email has already."));

    const hash = await bcrypt.hashSync(req.body.password, 10);
    await knex("buyer").insert({
      email: req.body.email,
      username: req.body.username,
      password: hash,
      created_at: new Date(),
    });
    return res.json("register");
  } catch (err) {
    next(err);
  }
});

// POST login
route.post("/login", async (req, res, next) => {
  try {
    const user = await knex("buyer")
      .select("*")
      .where("email", "=", req.body.email);
    if (user.length === 0) next(new Error("Not found email."));

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (match) {
      const token = await jwt.sign(
        { id: user[0].id, email: user[0].email, username: user[0].username },
        key.privateKey
      );
      return res.json({ token });
    } else {
      next(new Error("Password does't match."));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = route;
