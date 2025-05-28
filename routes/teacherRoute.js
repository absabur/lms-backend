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
  addTeacherDetails,
} = require("../controllers/teacherController");
const { createLimiterAuth } = require("../utils/limiter");
const { isTeacher, isTeacherForCompleteProfile } = require("../middleware/authentication");

const teacherRouter = express.Router();

teacherRouter.post("/getotp", createLimiterAuth(), SignUpVerifyTeacher);

teacherRouter.post(
  "/register",
  createLimiterAuth(),
  registerTeacher
);
teacherRouter.post(
  "/add-profile-details",
  createLimiterAuth(),
  isTeacherForCompleteProfile,
  upload.single("image"),
  addTeacherDetails
);

teacherRouter.post("/login", createLimiterAuth(), loginTeacher);

teacherRouter.post("/logout", createLimiterAuth(), logoutTeacher);

teacherRouter.get("/profile", isTeacher, getTeacherProfile);

teacherRouter.post("/update-password", isTeacher, updateTeacherPassword);

teacherRouter.post("/update-profile", isTeacher, upload.single("image"), updateTeacherProfile);

teacherRouter.post("/forgate-password", forgateTeacherPassword);

teacherRouter.post("/reset-password", createLimiterAuth(), resetTeacherPassword);

teacherRouter.post("/email-update-request", isTeacher, updateTeacherEmailRequest);

teacherRouter.post("/email-update", createLimiterAuth(), isTeacher, updateTeacherEmailConfirm);

module.exports = teacherRouter;
