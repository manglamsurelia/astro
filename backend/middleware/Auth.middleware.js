var jwt = require('jsonwebtoken');
const config = require("../config/config");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }
    else if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, config.jwt.SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.jwt = user;
        next();
      });
    }
  } catch (e) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }


  }
}

module.exports = authenticationMiddleware;