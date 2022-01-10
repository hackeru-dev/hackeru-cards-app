const chalk = require("chalk");

const logger = (req, res, next) => {
  console.log(
    chalk.greenBright(new Date().toLocaleTimeString(), req.method, req.url)
  );
  next();
};

exports.logger = logger;
