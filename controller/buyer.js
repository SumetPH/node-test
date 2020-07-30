const route = require("express").Router();
const db = require("../config/db");
const key = require("../config/key");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// POST register
route.post("/register", (req, res, next) => {
  db.query(
    "select * from buyer where email=$1",
    [req.body.email],
    (err, data) => {
      if (err) next(err);
      if (data.rows.length > 0)
        return res.status(400).json("Email has already.");

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) next(err);
        db.query(
          "insert into buyer(email,username,password,created_at) values($1,$2,$3,$4)",
          [req.body.email, req.body.username, hash, new Date()],
          (err) => {
            if (err) next(err);
            return res.json("register");
          }
        );
      });
    }
  );
});

// POST login
route.post("/login", (req, res, next) => {
  db.query(
    "select * from buyer where email=$1",
    [req.body.email],
    (err, data) => {
      const { email, username, password } = data.rows[0];
      if (err) next(err);
      if (data.rows.length === 0)
        return res.status(400).json("Not found email.");

      bcrypt.compare(req.body.password, password, (err, result) => {
        if (err) next(err);
        if (!result) return res.status(400).json("Password does't match.");
        const token = jwt.sign({ email, username }, key.privateKey);
        return res.json({ token });
      });
    }
  );
});

module.exports = route;
