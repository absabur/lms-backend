const express = require("express");
const upload = require("../utils/multer");
const {
  SignUpVerifyTeacher,
  registerTeacher,
  loginTeacher,
  logoutTeacher,
} = require("../controllers/teacherController");
const { limiter } = require("../utils/limiter");

const teacherRouter = express.Router();

teacherRouter.post("/signup", limiter, SignUpVerifyTeacher);

teacherRouter.post(
  "/register",
  limiter,
  upload.single("image"),
  registerTeacher
);

teacherRouter.post("/login", limiter, loginTeacher);

teacherRouter.post("/logout", limiter, logoutTeacher);

module.exports = teacherRouter;
