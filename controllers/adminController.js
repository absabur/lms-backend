const crypto = require("crypto");
const createError = require("http-errors");
const { localTime } = require("../utils/localTime.js");
const sendEmailWithNode = require("../config/nodemailer.js");
const Otp = require("../models/otpModel.js");
const cloudinary = require("../config/cloudinary.js");
const { jwtToken } = require("../utils/jwtToken.js");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel.js");
const { createJsonWebToken } = require("../utils/createToken.js");

exports.SignUpVerifyAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });
    if (admin) {
      throw createError(400, "Email already in use.");
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();

    const createDate = localTime();
    const expireDate = localTime(10);

    const otpExists = await Otp.findOne({ email });
    if (otpExists) {
      await Otp.deleteOne({ email });
    }

    const otp = await Otp.create({
      email,
      otp: verificationCode,
      role: "admin",
      createDate,
      expireDate,
    });

    const emailData = {
      email,
      subject: "Verify Your Email - Library Management System",
      html: `
          <div style="background-color: #f4f4f4; width: 100%; min-width: 350px; padding: 10px; box-sizing: border-box; font-family: Arial, sans-serif;">
            <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 10px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
              <h1 style="text-align: center; color: #d9534f; margin-bottom: 5px;">Library Management System</h1>
              <h2 style="text-align: center; color: #5cb85c;">Hello There,</h2>
              <p style="text-align: center; font-size: 18px; color: #333;">Use the following verification code to verify your email:</p>
              
              <div style="text-align: center; margin: 10px 0;">
                <span style="display: inline-block; font-size: 28px; font-weight: bold; color: #0275d8; background: #e9ecef; padding: 10px 20px; border-radius: 5px; letter-spacing: 2px;">
                  ${verificationCode}
                </span>
              </div>
  
              <p style="text-align: center; font-size: 16px; color: #555;">
                This code will expire in <strong style="color: #d9534f;">${expireDate.expireTime}</strong>.
              </p>
  
              <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;">
              <p style="text-align: center; font-size: 14px; color: #777;">
                If you did not request this verification, you can ignore this email.
              </p>
            </div>
          </div>
        `,
    };

    try {
      await sendEmailWithNode(emailData);
    } catch (error) {
      throw createError(500, "Failed to send verification email.");
    }

    res.status(200).json({
      success: true,
      message: `A verification code has been sent to ${email}.`,
    });
  } catch (error) {
    next(error);
  }
};

exports.registerAdmin = async (req, res, next) => {
  try {
    const {
      password,
      confirmPassword,
      verificationCode,
      name,
      email,
      phone,
      nId,
    } = req.body;

    if (password !== confirmPassword) {
      throw createError(400, "Password and Confirm Password did not match.");
    }

    if (!verificationCode) {
      throw createError(400, "Invalid or expired verification code.");
    }

    const otp = await Otp.findOne({ email, otp: verificationCode });

    if (!otp) {
      throw createError(400, "Invalid or expired verification code.");
    }

    const createDate = localTime(0);
    const updateDate = localTime(0);

    const givenTime = new Date(
      `${otp.expireDate.date} ${otp.expireDate.expireTime}`
    );
    const currentTime = new Date(`${createDate.date} ${createDate.time}`);

    if (currentTime > givenTime) {
      await Otp.deleteOne({ email, otp: verificationCode, role: "admin" });
      throw createError(400, "OTP has expired.");
    }

    let avatar = {
      public_id: "",
      url: "",
    };

    if (req.file.path) {
      await cloudinary.uploader.upload(
        req.file.path,
        { folder: "admins" },
        (err, res) => {
          if (err) {
            throw createError(500, "Failed to upload avatar to Cloudinary.");
          }

          avatar.public_id = res.public_id;
          avatar.url = res.secure_url;
        }
      );
    } else {
      throw createError(400, "Avatar image is required.");
    }

    const admin = await Admin.create({
      name,
      email,
      phone,
      nId,
      password,
      avatar,
      createDate,
      updateDate,
    });

    if (!admin) {
      throw createError(401, "Unable to create admin");
    }

    await Otp.deleteOne({ email, otp: verificationCode });

    const emailData = {
      email,
      subject:
        "Welcome to Library Management System - Account Created Successfully",
      html: `
          <div style="background-color: #f4f4f4; width: 100%; min-width: 350px; padding: 10px; box-sizing: border-box; font-family: Arial, sans-serif;">
            <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 10px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
              <h1 style="text-align: center; color: #d9534f; margin-bottom: 10px;">Library Management System</h1>
              <h2 style="text-align: center; color: #5cb85c;">Account Created Successfully!</h2>
              
              <p style="text-align: center; font-size: 18px; color: #333;">
                Congratulations, <strong>${admin.name}</strong>! 🎉 Your account has been successfully created.
              </p>
  
              <div style="text-align: center; margin: 10px 0;">
                <p style="font-size: 16px; color: #555;">You can now log in and start managing your library resources.</p>
                <a href="${process.env.clientUrl}/login" 
                   style="display: inline-block; background-color: #0275d8; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: bold; padding: 10px 20px; border-radius: 5px;">
                  Login Now
                </a>
              </div>
  
              <p style="text-align: center; font-size: 16px; color: #555;">
                If you did not create this account, please contact our support team immediately.
              </p>
  
              <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;">
              <p style="text-align: center; font-size: 14px; color: #777;">
                Thank you for joining us! 📚<br> Library Management System Team
              </p>
            </div>
          </div>
        `,
    };

    try {
      await sendEmailWithNode(emailData);
    } catch (error) {
      throw createError(500, "Failed to send verification email.");
    }

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    next(error);
  }
};

exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw createError(401, "Please enter email and password");
    }
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      throw createError(401, "invalid email or password");
    }
    const isPasswordMatch = await admin.comparedPassword(password);
    if (!isPasswordMatch) {
      throw createError(401, "invalid email or password");
    }

    const token = admin.getJWTToken();

    await jwtToken(token, res);

    res.status(200).json({
      success: true,
      admin,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.logoutAdmin = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) {
      throw createError(404, "Admin not found.");
    }
    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    next(error);
  }
};

// Update admin password
exports.updateAdminPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const admin = await Admin.findById(req.admin.id).select("+password");

    if (!admin) {
      throw createError(
        400,
        "Unable to update password. Admin does not exist."
      );
    }

    if (newPassword !== confirmPassword) {
      throw createError(
        402,
        "New Password and Confirm New Password did not match."
      );
    }

    const isPasswordMatch = await admin.comparedPassword(oldPassword);

    if (!isPasswordMatch) {
      throw createError(401, "Incorrect old password.");
    }

    admin.password = newPassword;
    admin.updateDate = localTime(0);

    await admin.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Update admin profile
exports.updateAdminProfile = async (req, res, next) => {
  try {
    let { name, phone, nId } = req.body;

    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      throw createError(400, "Unable to update Profile. Admin does not exist.");
    }

    const updatedData = {
      name: name || admin.name,
      phone: phone || admin.phone,
      nId: nId || admin.nId,
      isApporved: false,
      updateDate: localTime(0),
    };

    // Upload new avatar if exists
    if (req.file?.path) {
      await cloudinary.uploader.upload(
        req.file.path,
        { folder: "admins" },
        async (err, res) => {
          if (err) {
            throw createError(500, "Failed to upload avatar to Cloudinary.");
          }

          await cloudinary.uploader.destroy(admin.avatar.public_id);

          updatedData.avatar = {
            public_id: res.public_id,
            url: res.secure_url,
          };
        }
      );
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.admin.id,
      updatedData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({ success: true, admin: updatedAdmin });
  } catch (error) {
    next(error);
  }
};

// Forget admin password (send reset email)
exports.forgateAdminPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    throw createError(400, "Email is required.");
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw createError(404, "Admin not found.");
  }

  try {
    const token = createJsonWebToken(
      { email: email },
      process.env.JWT_PASSWORD_KEY,
      "10m"
    );

    const time = localTime(10);

    const emailData = {
      email,
      subject: "Reset Password",
      html: `
        <div style="background-color: rgba(175, 175, 175, 0.455); width: 100%; min-width: 350px; padding: 1rem; box-sizing: border-box;">
          <p style="font-size: 25px; font-weight: 500; text-align: center; color: tomato;">ABS E-Commerce</p>
          <h2 style="font-size: 30px; font-weight: 700; text-align: center; color: green;">Hello ${admin.name}</h2>
          <p style="margin: 0 auto; font-size: 22px; font-weight: 500; text-align: center; color: black;">
            This is a confirmation Email for reset password. We received a request from your email address to reset your password.
            <br /> If you did not make this request, please ignore this email.
          </p>
          <p style="text-align: center;">
            <a style="margin: 0 auto; text-align: center; background-color: #34eb34; font-size: 25px; box-shadow: 0 0 5px black; color: black; font-weight: 700; padding: 5px 10px; text-decoration: none;" href="${process.env.clientUrl}/reset-password/${token}" target="_blank">Click Here</a>
          </p>
          <p style="text-align: center; font-size: 18px; color: black;">to reset your password.</p>
          <p style="text-align: center;">
            <b style="color: red; font-size: 20px;">This email will expire in <span style="color: black;">${time.expireTime}</span>, please reset your password before that time.</b>
          </p>
        </div>
      `,
    };

    try {
      await sendEmailWithNode(emailData);
    } catch (error) {
      throw createError(500, "Failed to send verification email.");
    }

    res.status(200).json({
      success: true,
      message: `An email has been sent to ${admin.email}. Please check your inbox to reset your password. ${token}`,
    });
  } catch (error) {
    next(error);
  }
};

exports.resetAdminPassword = async (req, res, next) => {
  try {
    const { newPassword, confirmPassword, token } = req.body;
    if (!token) throw createError(404, "Token not found.");
    // Password validation
    if (newPassword !== confirmPassword) {
      throw createError(402, "Old password and new password did not match.");
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_PASSWORD_KEY);
      
      if (!decoded)
        throw createError(
          401,
          "Unable to verify admin. Token has expired or is invalid."
        );

      const admin = await Admin.findOne({ email: decoded.email });
      if (!admin) {
        throw createError(
          400,
          "Unable to reset password. Admin does not exist."
        );
      }

      // Hash the new password before saving
      admin.password = newPassword;
      admin.updateDate = localTime(0);

      await admin.save();

      res.status(201).json({
        success: true,
        message: "Password has been reset successfully",
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createError(401, "Token has expired.");
      } else if (error.name === "JsonWebTokenError") {
        throw createError(401, "Invalid token.");
      } else {
        throw error;
      }
    }
  } catch (error) {
    next(error);
  }
};

// Request to update Admin email
exports.updateAdminEmailRequest = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email format
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      throw createError(400, "Invalid email format.");
    }

    const data = await Admin.findById(req.admin.id).select("+password");
    const isPasswordMatch = data.comparedPassword(password, data.password);

    if (!isPasswordMatch) {
      throw createError(401, "Wrong password.");
    }

    const admin = await Admin.findOne({ email });
    if (admin) {
      throw createError(400, "Email already in use.");
    }

    const token = createJsonWebToken(
      { email, id: req.admin.id },
      process.env.JWT_CHANGE_EMAIL_KEY,
      "10m"
    );

    const time = localTime(10);

    const emailData = {
      email,
      subject: "Verify Email Change",
      html: `
        <div style="background-color: rgba(175, 175, 175, 0.455); width: 100%; min-width: 350px; padding: 1rem; box-sizing: border-box;">
          <p style="font-size: 25px; font-weight: 500; text-align: center; color: tomato;">ABS E-Commerce</p>
          <h2 style="font-size: 30px; font-weight: 700; text-align: center; color: green;">Hello ${req.admin.name}</h2>
          <p style="font-size: 22px; text-align: center; color: black;">We received a request to change your email. If you did not make this request, please ignore this email.</p>
          <p style="text-align: center;">
            <a style="background-color: #34eb34; font-size: 25px; font-weight: 700; padding: 5px 10px; text-decoration: none;" href="${process.env.clientUrl}/mail-update/${token}" target="_blank">Click Here to Update Email</a>
          </p>
          <p style="font-size: 18px; color: black;">This link expires in <b>${time.expireTime}</b>.</p>
        </div>
      `,
    };

    try {
      await sendEmailWithNode(emailData);
    } catch (error) {
      throw createError(500, "Failed to send verification email.");
    }

    res.status(200).json({
      success: true,
      message: `An email has been sent to ${email}. Please check and update from there. ${token}`,
    });
  } catch (error) {
    next(error);
  }
};

// Confirm email change
exports.updateAdminEmailConfirm = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) throw createError(404, "Token not found.");

    const decoded = jwt.verify(token, process.env.JWT_CHANGE_EMAIL_KEY);
    if (!decoded)
      throw createError(
        401,
        "Unable to verify admin. Token has expired or is invalid."
      );

    const { email, id } = decoded;
    const updateDate = localTime(0);

    const admin = await Admin.findByIdAndUpdate(
      id,
      { email, updateDate, isApproved: false },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    if (!admin) {
      throw createError(400, "Unable to update email. Admin does not exist.");
    }

    res.status(200).json({
      success: true,
      message: "Email updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// Get all admins with filters
exports.getAllAdmin = async (req, res, next) => {
  try {
    const { isAdmin, isBan, search } = req.query;

    const filter = {};

    if (isAdmin !== undefined) filter.isAdmin = isAdmin === "true";
    if (isBan !== undefined) filter.isBan = isBan === "true";

    if (search) {
      filter.$or = [
        { nId: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const admins = await Admin.find(filter);

    if (!admins || admins.length === 0) {
      throw createError(404, "Admins not found.");
    }

    res.status(200).json({
      success: true,
      admins,
    });
  } catch (error) {
    next(error);
  }
};

// Get admin by ID
exports.getAdminById = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      throw createError(404, "Admin not found.");
    }
    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    next(error);
  }
};

// Approve Admin
exports.approveAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

// Ban Admin
exports.banAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { isBan: true },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

// Unban Admin
exports.unbanAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { isBan: false },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
