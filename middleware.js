const jwt = require("jsonwebtoken");
const key = require("./key");

const isAuth = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json("Unauthorized");
  jwt.verify(req.headers.authorization, key.privateKey, (err, user) => {
    if (err) next(err);
    req.user = user;
    next();
  });
};

const notFund = (req, res, next) => {
  res.status(404);
  const err = new Error(`🔍 Not fond - ${req.originalUrl}`);
  next(err);
};

const errorHandle = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    massage: err.message,
    stack: process.env.NODE_ENV === "production" ? "🧁" : err.stack,
  });
};

module.exports = {
  isAuth,
  notFund,
  errorHandle,
};
