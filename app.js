const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const createHttpError = require("http-errors");
const cors = require("cors");
require("dotenv").config();

const {errorResponse} = require("./controllers/responseController.js");
const bookRouter = require("./routes/bookRoute.js");
const studentRouter = require("./routes/studentRoute.js");
const teacherRouter = require("./routes/teacherRoute.js");
const adminRouter = require("./routes/adminRoute.js");
const takingBookStudentRouter = require("./routes/bookStudentRoute.js");
const takingBookTeacherRouter = require("./routes/bookTeacherRoute.js");
const fixedValueRouter = require("./routes/fixedValueRoute.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const clientUrl = process.env.clientUrl;
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);



app.use(cookieParser());

app.use("/api/admin", adminRouter);

app.use("/api/book", bookRouter);

app.use("/api/student", studentRouter);

app.use("/api/teacher", teacherRouter);

app.use("/api/take-book/student", takingBookStudentRouter);

app.use("/api/take-book/teacher", takingBookTeacherRouter);

app.use("/api/fixed-values", fixedValueRouter)

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