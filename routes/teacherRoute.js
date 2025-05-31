const express = require("express");
const upload = require("../utils/multer");
const {
  SignUpVerifyTeacher,
  registerTeacher,
  loginTeacher,
  logoutTeacher,
  getTeacherProfile,
  updateTeacherProfile,
  updateTeacherPassword,
  forgateTeacherPassword,
  resetTeacherPassword,
  updateTeacherEmailRequest,
  updateTeacherEmailConfirm,
} = require("../controllers/teacherController");
const { createLimiterAuth } = require("../utils/limiter");
const { isTeacher } = require("../middleware/authentication");

const teacherRouter = express.Router();

teacherRouter.post("/getotp", createLimiterAuth(), SignUpVerifyTeacher);

teacherRouter.post(
  "/register",
  createLimiterAuth(),
  upload.single("image"),
  registerTeacher
);

teacherRouter.post("/login", createLimiterAuth(), loginTeacher);

teacherRouter.post("/logout", createLimiterAuth(), logoutTeacher);

teacherRouter.get("/profile", isTeacher, getTeacherProfile);

teacherRouter.post("/update-password", isTeacher, updateTeacherPassword);

teacherRouter.post(
  "/update-profile",
  isTeacher,
  upload.single("image"),
  updateTeacherProfile
);

teacherRouter.post("/forgate-password", forgateTeacherPassword);

teacherRouter.post(
  "/reset-password",
  createLimiterAuth(),
  resetTeacherPassword
);

teacherRouter.post(
  "/email-update-request",
  isTeacher,
  updateTeacherEmailRequest
);

teacherRouter.post(
  "/email-update",
  createLimiterAuth(),
  isTeacher,
  updateTeacherEmailConfirm
);

module.exports = teacherRouter;
