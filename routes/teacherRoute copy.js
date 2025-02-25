const express = require("express");
const upload = require("../utils/multer");
const { SignUpVerifyAdmin, registerAdmin, loginAdmin, logoutAdmin } = require("../controllers/adminController");
const { createLimiterAuth } = require("../utils/limiter");

const adminRouter = express.Router();

adminRouter.post("/signup", createLimiterAuth(), SignUpVerifyAdmin);

adminRouter.post("/register", createLimiterAuth(),  upload.single('image'), registerAdmin);

adminRouter.post("/login", createLimiterAuth(), loginAdmin);

adminRouter.post("/logout", createLimiterAuth(), logoutAdmin);

module.exports = adminRouter;