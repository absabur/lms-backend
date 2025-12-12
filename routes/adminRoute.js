const express = require("express");
const upload = require("../utils/multer");
const {
  SignUpVerifyAdmin,
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  updateAdminPassword,
  forgateAdminPassword,
  resetAdminPassword,
  updateAdminEmailRequest,
  updateAdminEmailConfirm,
  getAllAdmin,
  getAdminById,
  approveAdmin,
  banAdmin,
  unbanAdmin,
  authenticated,
  getDashboard,
} = require("../controllers/adminController");
const { createLimiterAuth } = require("../utils/limiter");
const { isAdmin, isSuperAdmin } = require("../middleware/authentication");
const {
  getAllStudent,
  getStudentById,
  registerStudentByAdmin,
  updateStudentProfileByAdmin,
  approveStudent,
  banStudent,
  unbanStudent,
} = require("../controllers/studentController");
const {
  getAllTeacher,
  getTeacherById,
  registerTeacherByAdmin,
  updateTeacherProfileByAdmin,
  approveTeacher,
  banTeacher,
  unbanTeacher,
} = require("../controllers/teacherController");

const adminRouter = express.Router();

// Admin-related routes
adminRouter.post("/signup", createLimiterAuth(), SignUpVerifyAdmin);
adminRouter.post(
  "/register",
  createLimiterAuth(),
  upload.single("image"),
  registerAdmin
);
adminRouter.post("/login", createLimiterAuth(), loginAdmin);
adminRouter.post("/logout", createLimiterAuth(), logoutAdmin);
adminRouter.get("/authenticated", authenticated);
adminRouter.get("/profile", isAdmin, getAdminProfile);
adminRouter.post(
  "/update-password",
  isAdmin,
  upload.none(),
  updateAdminPassword
);
adminRouter.post(
  "/update-profile",
  isAdmin,
  upload.single("image"),
  updateAdminProfile
);
adminRouter.post("/forgate-password", forgateAdminPassword);
adminRouter.post("/reset-password", createLimiterAuth(), resetAdminPassword);
adminRouter.post("/email-update-request", isAdmin, updateAdminEmailRequest);
adminRouter.post(
  "/email-update",
  createLimiterAuth(),
  isAdmin,
  updateAdminEmailConfirm
);

// Teacher-related routes
adminRouter.get("/all-teachers", isAdmin, getAllTeacher);
adminRouter.get(
  "/teacher-details/:id([0-9a-fA-F]{24})",
  isAdmin,
  getTeacherById
);
adminRouter.post(
  "/create-teacher",
  isAdmin,
  upload.single("image"),
  registerTeacherByAdmin
);
adminRouter.post(
  "/update-teacher/:id([0-9a-fA-F]{24})",
  isAdmin,
  upload.single("image"),
  updateTeacherProfileByAdmin
);
adminRouter.get(
  "/approve-teacher/:id([0-9a-fA-F]{24})",
  isAdmin,
  approveTeacher
);
adminRouter.get("/ban-teacher/:id([0-9a-fA-F]{24})", isAdmin, banTeacher);
adminRouter.get("/unban-teacher/:id([0-9a-fA-F]{24})", isAdmin, unbanTeacher);

adminRouter.get("/dashboard", getDashboard);

// Student-related routes
adminRouter.get("/all-students", isAdmin, getAllStudent);
adminRouter.get(
  "/student-details/:id([0-9a-fA-F]{24})",
  isAdmin,
  getStudentById
);
adminRouter.post(
  "/create-student",
  isAdmin,
  upload.single("image"),
  registerStudentByAdmin
);
adminRouter.post(
  "/update-student/:id([0-9a-fA-F]{24})",
  isAdmin,
  upload.single("image"),
  updateStudentProfileByAdmin
);
adminRouter.get(
  "/approve-student/:id([0-9a-fA-F]{24})",
  isAdmin,
  approveStudent
);
adminRouter.get("/ban-student/:id([0-9a-fA-F]{24})", isAdmin, banStudent);
adminRouter.get("/unban-student/:id([0-9a-fA-F]{24})", isAdmin, unbanStudent);

// Super Admin-related routes
adminRouter.get("/all-admins", isSuperAdmin, getAllAdmin);
adminRouter.get(
  "/admin-details/:id([0-9a-fA-F]{24})",
  isSuperAdmin,
  getAdminById
);
adminRouter.get(
  "/approve-admin/:id([0-9a-fA-F]{24})",
  isSuperAdmin,
  approveAdmin
);
adminRouter.get("/ban-admin/:id([0-9a-fA-F]{24})", isSuperAdmin, banAdmin);
adminRouter.get("/unban-admin/:id([0-9a-fA-F]{24})", isSuperAdmin, unbanAdmin);

module.exports = adminRouter;
