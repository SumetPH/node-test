const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json("Unauthorized");
  if (req.headers.authorization.includes("Bearer")) {
    const auth = req.headers.authorization.split(" ");
    req.headers.authorization = auth[1];
  }
  jwt.verify(
    req.headers.authorization,
    process.env.PRIVATE_KEY,
    (err, user) => {
      if (err) return next(err);
      req.user = user;
      next();
    }
  );
};

const notFund = (req, res, next) => {
  res.status(404);
  const err = new Error(`🔍 Not fond - ${req.originalUrl}`);
  next(err);
};

const errorHandle = (err, req, res, next) => {
  // console.log(err.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
  isAuth,
  notFund,
  errorHandle,
};
