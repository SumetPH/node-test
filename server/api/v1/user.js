const route = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { isAuth } = require("../../middleware");
const user = require("../../config/db").get("user");
const joi = require("@hapi/joi");

// POST register
// REQ email, username, password
route.post("/register", async (req, res, next) => {
  const registerSchema = joi.object({
    email: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required(),
  });
  try {
    await registerSchema.validateAsync(req.body);
    // check email
    const checkEmail = await user.findOne({ email: req.body.email });
    if (checkEmail) {
      return next(new Error("Email has already."));
    } else {
      const hash = await bcrypt.hashSync(req.body.password, 10);
      await user.insert({
        email: req.body.email,
        username: req.body.username,
        password: hash,
        provider: "local",
        created_at: new Date(),
      });
      return res.json({ msg: "register" });
    }
  } catch (error) {
    return next(error);
  }
});

// POST login
// REQ email, password
route.post("/login", async (req, res, next) => {
  try {
    // validate
    const loginSchema = joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    });
    await loginSchema.validateAsync(req.body);
    // check user by email
    const checkUser = await user.findOne({ email: req.body.email });
    if (checkUser) {
      // check password match
      const match = await bcrypt.compare(req.body.password, checkUser.password);
      if (match) {
        const token = await jwt.sign(
          {
            _id: checkUser._id,
            email: checkUser.email,
            username: checkUser.username,
            provider: checkUser.provider,
          },
          process.env.PRIVATE_KEY
        );
        return res.json({ msg: "login", token: `${token}` });
      } else {
        return next(new Error("Password does't match."));
      }
    } else {
      return next(new Error("Not found Email."));
    }
  } catch (err) {
    return next(err);
  }
});

// GET facebook login
// route.get("/login/facebook", passport.authenticate("facebook"));

// GET facebook login callback
// route.get(
//   "/login/facebook/return",
//   passport.authenticate("facebook", { session: false }),
//   async (req, res) => {
//     const token = await jwt.sign(req.user, key.privateKey);
//     if (process.env.NODE_ENV === "production") {
//       return res.redirect(`/login?token=${token}`);
//     } else {
//       return res.redirect(`http://localhost:8080/login?token=${token}`);
//     }
//   }
// );

// GET check user by token in header
route.get("/check", isAuth, (req, res) => {
  return res.json({ msg: "checked", user: req.user });
});

module.exports = route;
