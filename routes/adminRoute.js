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
} = require("../controllers/adminController");
const { createLimiterAuth } = require("../utils/limiter");
const { isAdmin } = require("../middleware/authentication");

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

module.exports = adminRouter;
