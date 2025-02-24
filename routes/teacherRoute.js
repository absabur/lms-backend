const express = require("express");
const upload = require("../utils/multer");
const { SignUpVerifyTeacher, registerTeacher, loginTeacher, logoutTeacher } = require("../controllers/teacherController");

const teacherRouter = express.Router();

teacherRouter.post("/signup", SignUpVerifyTeacher);

teacherRouter.post("/register",  upload.single('image'), registerTeacher);

teacherRouter.post("/login", loginTeacher);

teacherRouter.post("/logout", logoutTeacher);

module.exports = teacherRouter;