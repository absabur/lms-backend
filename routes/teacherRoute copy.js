const express = require("express");
const upload = require("../utils/multer");
const { SignUpVerifyAdmin, registerAdmin, loginAdmin, logoutAdmin } = require("../controllers/adminController");
const { limiter } = require("../utils/limiter");

const adminRouter = express.Router();

adminRouter.post("/signup", limiter, SignUpVerifyAdmin);

adminRouter.post("/register", limiter,  upload.single('image'), registerAdmin);

adminRouter.post("/login", limiter, loginAdmin);

adminRouter.post("/logout", limiter, logoutAdmin);

module.exports = adminRouter;