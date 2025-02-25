const express = require("express");
const upload = require("../utils/multer");
const {
  SignUpVerifyTeacher,
  registerTeacher,
  loginTeacher,
  logoutTeacher,
} = require("../controllers/teacherController");
const { createLimiterAuth } = require("../utils/limiter");

const teacherRouter = express.Router();

teacherRouter.post("/signup", createLimiterAuth(), SignUpVerifyTeacher);

teacherRouter.post(
  "/register",
  createLimiterAuth(),
  upload.single("image"),
  registerTeacher
);

teacherRouter.post("/login", createLimiterAuth(), loginTeacher);

teacherRouter.post("/logout", createLimiterAuth(), logoutTeacher);

module.exports = teacherRouter;
