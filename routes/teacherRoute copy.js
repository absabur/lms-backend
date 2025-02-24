const express = require("express");
const upload = require("../utils/multer");
const { SignUpVerifyAdmin, registerAdmin, loginAdmin, logoutAdmin } = require("../controllers/adminController");

const adminRouter = express.Router();

adminRouter.post("/signup", SignUpVerifyAdmin);

adminRouter.post("/register",  upload.single('image'), registerAdmin);

adminRouter.post("/login", loginAdmin);

adminRouter.post("/logout", logoutAdmin);

module.exports = adminRouter;