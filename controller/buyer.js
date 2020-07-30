const route = require("express").Router();
const knex = require("../config/knex");
const key = require("../config/key");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// POST register
route.post("/register", (req, res, next) => {
  knex
    .select()
    .from("buyer")
    .where("email", "=", req.body.email)
    .then((user) => {
      if (user.length > 0) return res.status(400).json("Email has already.");

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) next(err);
        knex("buyer")
          .insert({
            email: req.body.email,
            username: req.body.username,
            password: hash,
            created_at: new Date(),
          })
          .then(() => {
            return res.json("register");
          })
          .catch((err) => next(err));
      });
    })
    .catch((err) => next(err));
});

// POST login
route.post("/login", (req, res, next) => {
  knex
    .select()
    .from("buyer")
    .where("email", "=", req.body.email)
    .then((user) => {
      if (user.length === 0) return res.status(400).json("Not found email.");

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) next(err);
        if (!result) return res.status(400).json("Password does't match.");
        const token = jwt.sign(
          { email: user[0].email, username: user[0].username },
          key.privateKey
        );
        return res.json({ token });
      });
    })
    .catch((err) => next(err));
});

module.exports = route;
