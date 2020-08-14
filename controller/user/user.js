const route = require("express").Router();
const knex = require("../../config/knex");
const key = require("../../config/key");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// POST register
// REQ email, username, password
route.post("/register", async (req, res, next) => {
  try {
    const checkEmail = await knex("user")
      .select("*")
      .where("email", "=", req.body.email);
    if (checkEmail.length > 0) next(new Error("Email has already."));

    const hash = await bcrypt.hashSync(req.body.password, 10);
    await knex("user").insert({
      email: req.body.email,
      username: req.body.username,
      password: hash,
      created_at: new Date()
    });
    return res.json("register");
  } catch (err) {
    next(err);
  }
});

// POST login
// REQ email, password
route.post("/login", async (req, res, next) => {
  try {
    const user = await knex("user")
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
