const express = require("express");
const app = express();
const chalk = require("chalk");
const mongoose = require("mongoose");
const cors = require("cors"); // להוריד כשמעלים לשרת אמיתי!!!
const { logger } = require("./middleware/logger");
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authentication");
const cardsRouter = require("./routes/cardsRouter");

mongoose
  .connect("mongodb://localhost/business_card_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(chalk.magentaBright("connected to MongoDb!")))
  .then(() =>
    console.log(
      chalk.yellowBright("*------------------ Errors -------------------*")
    )
  )
  .catch(error => console.error(`could not connect to mongoDb: ${error}`));

app.use(cors()); // להוריד כשמעלים לשרת אמיתי!!!
app.use(express.json());
app.use(logger);

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/cards", cardsRouter);

const PORT = 8181;
app.listen(PORT, () =>
  console.log(chalk.blueBright(`server run on: http://:localhost:${PORT}`))
);
