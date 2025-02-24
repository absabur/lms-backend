const express = require("express");
const {
  SignUpVerifyStudent,
  registerStudent,
  loginStudent,
  logoutStudent,
} = require("../controllers/studentController");
const upload = require("../utils/multer");
const { limiter } = require("../utils/limiter");

const studentRouter = express.Router();

studentRouter.post("/signup", limiter, SignUpVerifyStudent);

studentRouter.post(
  "/register",
  limiter,
  upload.single("image"),
  registerStudent
);

studentRouter.post("/login", limiter, loginStudent);

studentRouter.post("/logout", limiter, logoutStudent);

module.exports = studentRouter;
