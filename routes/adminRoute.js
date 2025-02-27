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
} = require("../controllers/adminController");
const { createLimiterAuth } = require("../utils/limiter");
const { isAdmin, isSuperAdmin } = require("../middleware/authentication");
const { getAllStudent, getStudentById, registerStudentByAdmin, updateStudentProfileByAdmin, approveStudent, banStudent, unbanStudent } = require("../controllers/studentController");
const { getAllTeacher, getTeacherById, registerTeacherByAdmin, updateTeacherProfileByAdmin, approveTeacher, banTeacher, unbanTeacher } = require("../controllers/teacherController");

const adminRouter = express.Router();

adminRouter.post("/signup", createLimiterAuth(), SignUpVerifyAdmin);

adminRouter.post(
  "/register",
  createLimiterAuth(),
  upload.single("image"),
  registerAdmin
);

adminRouter.post("/login", createLimiterAuth(), loginAdmin);

adminRouter.post("/logout", createLimiterAuth(), logoutAdmin);

adminRouter.get("/profile", isAdmin, getAdminProfile);

adminRouter.post("/update-password", isAdmin, updateAdminPassword);

adminRouter.post(
  "/update-profile",
  isAdmin,
  upload.single("image"),
  updateAdminProfile
);

adminRouter.post("/forgate-password", forgateAdminPassword);

adminRouter.post("/reset-password", createLimiterAuth(), resetAdminPassword);

adminRouter.post("/email-update-request", isAdmin, updateAdminEmailRequest);

adminRouter.post("/email-update", createLimiterAuth(), isAdmin, updateAdminEmailConfirm);

adminRouter.get("/all-admins", isAdmin, getAllAdmin)

adminRouter.get("/all-students", isAdmin, getAllStudent)

adminRouter.get("/all-teachers", isAdmin, getAllTeacher)

adminRouter.get("/admin-details/:id([0-9a-fA-F]{24})", isAdmin, getAdminById)

adminRouter.get("/student-details/:id([0-9a-fA-F]{24})", isAdmin, getStudentById)

adminRouter.get("/teacher-details/:id([0-9a-fA-F]{24})", isAdmin, getTeacherById)

adminRouter.post("/create-student", isAdmin, registerStudentByAdmin)

adminRouter.post("/create-teacher", isAdmin, registerTeacherByAdmin)

adminRouter.post("/update-student/:id([0-9a-fA-F]{24})", isAdmin, updateStudentProfileByAdmin)

adminRouter.post("/update-teacher/:id([0-9a-fA-F]{24})", isAdmin, updateTeacherProfileByAdmin)

adminRouter.get("/approve-student/:id([0-9a-fA-F]{24})", isAdmin, approveStudent);

adminRouter.get("/ban-student/:id([0-9a-fA-F]{24})", isAdmin, banStudent);

adminRouter.get("/unban-student/:id([0-9a-fA-F]{24})", isAdmin, unbanStudent);

adminRouter.get("/approve-teacher/:id([0-9a-fA-F]{24})", isAdmin, approveTeacher);

adminRouter.get("/ban-teacher/:id([0-9a-fA-F]{24})", isAdmin, banTeacher);

adminRouter.get("/unban-teacher/:id([0-9a-fA-F]{24})", isAdmin, unbanTeacher);

adminRouter.get("/approve-admin/:id([0-9a-fA-F]{24})", isSuperAdmin, approveAdmin);

adminRouter.get("/ban-admin/:id([0-9a-fA-F]{24})", isSuperAdmin, banAdmin);

adminRouter.get("/unban-admin/:id([0-9a-fA-F]{24})", isSuperAdmin, unbanAdmin);



module.exports = adminRouter;
