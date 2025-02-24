const express = require("express");
const { SignUpVerifyStudent, registerStudent, loginStudent, logoutStudent } = require("../controllers/studentController");
const upload = require("../utils/multer");

const studentRouter = express.Router();

studentRouter.post("/signup", SignUpVerifyStudent);

studentRouter.post("/register",  upload.single('image'), registerStudent);

studentRouter.post("/login", loginStudent);

studentRouter.post("/logout", logoutStudent);

module.exports = studentRouter;