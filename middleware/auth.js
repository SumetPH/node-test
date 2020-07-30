const jwt = require("jsonwebtoken");
const key = require("../config/key");

module.exports.isAuth = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json("Unauthorized");
  jwt.verify(req.headers.authorization, key.privateKey, (err, user) => {
    if (err) next(err);
    req.user = user;
    next();
  });
};
