const express = require("express");
const {
  SignUpVerifyStudent,
  registerStudent,
  loginStudent,
  logoutStudent,
} = require("../controllers/studentController");
const upload = require("../utils/multer");
const { createLimiterAuth } = require("../utils/limiter");

const studentRouter = express.Router();

studentRouter.post("/signup", createLimiterAuth(), SignUpVerifyStudent);

studentRouter.post(
  "/register",
  createLimiterAuth(),
  upload.single("image"),
  registerStudent
);

studentRouter.post("/login", createLimiterAuth(), loginStudent);

studentRouter.post("/logout", createLimiterAuth(), logoutStudent);

module.exports = studentRouter;
