const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const createHttpError = require("http-errors");
const cors = require("cors");
require("dotenv").config();

const {errorResponse} = require("./controllers/responseController.js")

const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const clientUrl = process.env.clientUrl;


app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);

app.use(cookieParser());


app.use("/api", userRoutes); // Add the user routes

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use((req, res, next) => {
  next(createHttpError(404, "route not found."));
});

app.use((err, req, res, next) => {
  if (err.name === "CastError") {
    return errorResponse(res, {
      statusCode: err.status,
      message: `Resource not found, invalid: ${err.path}`,
    });
  }
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;