const jwt = require("jsonwebtoken");
const config = require("config");
const chalk = require("chalk");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied!");

  try {
    const decoded = jwt.verify(token, config.get("jwtKey"));
    req.user = decoded;
    next();
  } catch (err) {
    console.log(chalk.redBright(err));
    res.status(400).send("Invalid token");
  }
};
