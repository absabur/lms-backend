const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();


const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { errorResponse } = require("./controllers/responseController.js");
const bookRouter = require("./routes/bookRoute.js");
const studentRouter = require("./routes/studentRoute.js");
const teacherRouter = require("./routes/teacherRoute.js");
const adminRouter = require("./routes/adminRoute.js");
const takingBookStudentRouter = require("./routes/bookStudentRoute.js");
const takingBookTeacherRouter = require("./routes/bookTeacherRoute.js");
const fixedValueRouter = require("./routes/fixedValueRoute.js");
const Teacher = require("./models/teacherModel.js");
const Student = require("./models/studentModel.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const clientUrls = [process.env.CLIENT_URL_1, process.env.CLIENT_URL_2];
console.log(clientUrls)

app.use(
  cors({
    origin: clientUrls,
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

app.use("/api/fixed-values", fixedValueRouter);

app.get("/api/authenticated", async (req, res, next) => {
  try {
    // 1. Get token from cookies or headers
    const token = req.cookies.access_token || req.headers.access_token;

    if (!token || token === "null") {
      throw createError(401, "You must login first.");
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      throw createError(401, "Invalid token.");
    }

    // 3. Check role by user ID
    let role = "";
    const [teacher, student] = await Promise.all([
      Teacher.findById(decoded.id),
      Student.findById(decoded.id),
    ]);

    let profile;

    if (teacher) {
      role = "teacher";
      profile = teacher
    } else if (student) {
      role = "student";
      profile = student
    } else {
      throw createError(404, "User not found.");
    }


    // 4. Respond with role
    res.status(200).json({
      success: true,
      role,
      profile,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use((req, res, next) => {
  next(createError(404, "route not found."));
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
