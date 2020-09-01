const route = require("express").Router();
const knex = require("../../../config/knex");
const key = require("../../../key");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { isAuth } = require("../../../middleware");

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
      provider: "local",
      created_at: new Date(),
    });
    return res.json({ msg: "register" });
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
      .where("username", "=", req.body.username);
    if (user.length === 0) next(new Error("Not found username."));

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (match) {
      const token = await jwt.sign(
        {
          id: user[0].id,
          email: user[0].email,
          username: user[0].username,
          provider: user[0].provider,
        },
        key.privateKey
      );
      return res.json({ msg: "login", token: token });
    } else {
      next(new Error("Password does't match."));
    }
  } catch (err) {
    next(err);
  }
});

// GET facebook login
route.get("/login/facebook", passport.authenticate("facebook"));

// GET facebook login callback
route.get(
  "/login/facebook/return",
  passport.authenticate("facebook", { session: false }),
  async (req, res) => {
    const token = await jwt.sign(req.user, key.privateKey);
    if (process.env.NODE_ENV === "production") {
      return res.redirect(`/login?token=${token}`);
    } else {
      return res.redirect(`http://localhost:8080/login?token=${token}`);
    }
  }
);

// GET check user by token in header
route.get("/check", isAuth, (req, res) => {
  return res.json({ msg: "checked", user: req.user });
});

module.exports = route;
