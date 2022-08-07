const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

exports.authenticateToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Unauthorized!", isAuthenticated: false });
      }
      next();
    });
  }
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
};
