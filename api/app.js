const express = require("express");
const expressWinston = require("express-winston");
const { transports, format } = require("winston");
const logger = require("./middleware/logger");
const cors = require("cors");
const eventRouter = require("./routes/events");
const guestRouter = require("./routes/guestUser");
const quizRouter = require("./routes/quiz");
const userRouter = require("./routes/userDetails");
const appsRouter = require("./routes/apps");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(
  expressWinston.logger({
    transports: [
      new transports.File({
        filename: "info-logs.log",
        level: "info",
        format: format.combine(format.timestamp(), format.json()),
      }),
      new transports.File({
        filename: "error-logs.log",
        level: "error",
        format: format.combine(format.timestamp(), format.json()),
      }),
    ],
    format: format.combine(format.colorize(), format.json()),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
  })
);

app.use((err, req, res, next) => {
  console.log("uncaughtException: ", err);
  logger.error(`Error: ${err}`);
});

app.use("/neo/events", eventRouter);
app.use("/neo/guestUser", guestRouter);
app.use("/neo/quiz", quizRouter);
app.use("/neo/userDetails", userRouter);
app.use("/neo/appData", appsRouter);

module.exports = app;
