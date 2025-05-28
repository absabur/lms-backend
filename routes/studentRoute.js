const express = require("express");
const {
  SignUpVerifyStudent,
  registerStudent,
  loginStudent,
  logoutStudent,
  getStudentProfile,
  updateStudentProfile,
  updateStudentPassword,
  forgateStudentPassword,
  resetStudentPassword,
  updateStudentEmailRequest,
  updateStudentEmailConfirm,
  addStudentDetails,
} = require("../controllers/studentController");
const upload = require("../utils/multer");
const { createLimiterAuth } = require("../utils/limiter");
const { isStudent, isStudentForCompleteProfile } = require("../middleware/authentication");

const studentRouter = express.Router();

studentRouter.post("/getotp", createLimiterAuth(), SignUpVerifyStudent);
studentRouter.post(
  "/register",
  createLimiterAuth(),
  registerStudent
);
studentRouter.post(
  "/add-profile-details",
  createLimiterAuth(),
  isStudentForCompleteProfile,
  upload.single("image"),
  addStudentDetails
);
studentRouter.post("/login", createLimiterAuth(), loginStudent);
studentRouter.post("/logout", createLimiterAuth(), logoutStudent);
studentRouter.get("/profile", isStudent, getStudentProfile);
studentRouter.post("/update-password", isStudent, updateStudentPassword);

studentRouter.post(
  "/update-profile",
  isStudent,
  upload.single("image"),
  updateStudentProfile
);

studentRouter.post("/forgate-password", forgateStudentPassword);

studentRouter.post("/reset-password", createLimiterAuth(), resetStudentPassword);

studentRouter.post(
  "/email-update-request",
  isStudent,
  updateStudentEmailRequest
);

studentRouter.post("/email-update", createLimiterAuth(), isStudent, updateStudentEmailConfirm);

module.exports = studentRouter;
