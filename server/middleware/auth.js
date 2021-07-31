const jwt = require("jsonwebtoken");
const config = require("config");
const DB = require("../../config/db");

module.exports = function(req, res, next) {
  // Get token from the header
  const bearerToken = req.header("Authorization");
  const bearer = bearerToken.split(" ");
  const token = bearer[1];

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No Token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    DB.query(`SELECT * FROM tokens where token='${token}'`)
      .then(results => {
        if (results.rows.length > 0) {
          req.user = decoded.user;
          req.user.token = token;
          req.user.type = results.rows[0].type;
          next();
        } else {
          return res.status(401).json({ msg: "token is not valid" });
        }
      })
      .catch(e => {
        res.status(401).json({ msg: "token is not valid" });
      });
  } catch (e) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
