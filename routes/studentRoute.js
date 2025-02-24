const express = require("express");
const { SignUpVerify, registerStudent } = require("../controllers/studentController");
const upload = require("../utils/multer");

const studentRouter = express.Router();

studentRouter.post("/signup", SignUpVerify);

studentRouter.post("/register",  upload.single('image'), registerStudent);

module.exports = studentRouter;