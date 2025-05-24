const crypto = require("crypto");
const createError = require("http-errors");
const { localTime } = require("../utils/localTime.js");
const sendEmailWithNode = require("../config/nodemailer.js");
const Otp = require("../models/otpModel.js");
const cloudinary = require("../config/cloudinary.js");
const Teacher = require("../models/teacherModel.js");
const { jwtToken } = require("../utils/jwtToken.js");
const { createJsonWebToken } = require("../utils/createToken.js");
const jwt = require("jsonwebtoken");

// Signup handler
exports.SignUpVerifyTeacher = async (req, res, next) => {
  try {
    const { email } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (teacher) {
      return next(createError(400, "Email already in use."));
    }

    const verificationCode = crypto.randomInt(100000, 1000000).toString();

    const createDate = localTime();
    const expireDate = localTime(10);

    if (!expireDate.expireTime) {
      return next(createError(500, "Failed to generate expiration time."));
    }

    await Otp.deleteOne({ email });

    const otp = await Otp.create({
      email,
      otp: verificationCode,
      role: "teacher",
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
    } catch (emailError) {
      return next(createError(500, "Failed to send verification email."));
    }

    res.status(200).json({
      success: true,
      message: `A verification code has been sent to ${email}.`,
    });
  } catch (error) {
    next(error);
  }
};
exports.registerTeacher = async (req, res, next) => {
  try {
    const { password, confirmPassword, verificationCode, email } = req.body;

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
      await Otp.deleteOne({ email, otp: verificationCode, role: "teacher" });
      throw createError(400, "OTP has expired.");
    }

    const teacher = new Teacher({
      email,
      password,
      createDate,
      updateDate,
    });

    await teacher.save({ validateBeforeSave: false });

    if (!teacher) {
      throw createError(401, "Unable to create teacher");
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
                Congratulations, 🎉 Your account has been successfully created.
              </p>
              <div style="text-align: center; margin: 10px 0;">
                <p style="font-size: 16px; color: #555;">You can now log in and start managing your library resources.</p>
                <a href="${process.env.CLIENT_URL_1}/login" 
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
      teacher,
    });
  } catch (error) {
    next(error);
  }
};
exports.addTeacherDetails = async (req, res, next) => {
  try {
    const { name, phone, nId, department, post, teacherId, address } = req.body;

    let avatar = {
      public_id: "",
      url: "",
    };

    if (req.file.path) {
      await cloudinary.uploader.upload(
        req.file.path,
        { folder: "teachers" },
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

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.teacher.id,
      {
        name,
        phone,
        nId,
        teacherId,
        avatar,
        department,
        post,
        address,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (!updatedTeacher) {
      throw createError(401, "Unable to add teacher details");
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.loginTeacher = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError(401, "Please enter email and password");
    }

    const teacher = await Teacher.findOne({ email }).select("+password");

    if (!teacher) {
      throw createError(401, "invalid email or password");
    }

    const isPasswordMatch = await teacher.comparedPassword(password);

    if (!isPasswordMatch) {
      throw createError(401, "invalid email or password");
    }

    const token = teacher.getJWTToken();

    await jwtToken(token, res);

    res.status(200).json({
      success: true,
      teacher,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.logoutTeacher = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "",
      secure: process.env.NODE_ENV === "production" ? true : false,
      path: "/",
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTeacherProfile = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.teacher.id).select("-password");
    if (!teacher) {
      throw createError(404, "Teacher not found.");
    }
    res.status(200).json({
      success: true,
      teacher,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateTeacherPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const teacher = await Teacher.findById(req.teacher.id).select("+password");
    if (!teacher) {
      throw createError(
        400,
        "Unable to update password. Teacher does not exist."
      );
    }

    if (newPassword !== confirmPassword) {
      throw createError(402, "New Password and Confirm Password do not match.");
    }

    const isPasswordMatch = await teacher.comparedPassword(oldPassword);
    if (!isPasswordMatch) {
      throw createError(401, "Old password is incorrect.");
    }

    teacher.password = newPassword;
    teacher.updateDate = localTime(0);

    await teacher.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};
exports.updateTeacherProfile = async (req, res, next) => {
  try {
    const { name, phone, nId, teacherId, department, post, address } = req.body;

    const teacher = await Teacher.findById(req.teacher.id);
    if (!teacher) {
      throw createError(
        400,
        "Unable to update profile. Teacher does not exist."
      );
    }

    const updatedData = {
      name: name || teacher.name,
      phone: phone || teacher.phone,
      nId: nId || teacher.nId,
      teacherId: teacherId || teacher.teacherId,
      department: department || teacher.department,
      post: post || teacher.post,
      address: address || teacher.address,
      updateDate: localTime(0),
    };

    if (req.file?.path) {
      try {
        // Upload new avatar to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "teachers",
        });

        // Remove old avatar if exists
        if (teacher.avatar?.public_id) {
          await cloudinary.uploader.destroy(teacher.avatar.public_id);
        }

        updatedData.avatar = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        };
      } catch (uploadError) {
        throw createError(500, "Failed to upload avatar to Cloudinary.");
      }
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.teacher.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      teacher: updatedTeacher,
    });
  } catch (error) {
    next(error);
  }
};
exports.forgateTeacherPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Validate email input
    if (!email) {
      throw createError(400, "Email is required.");
    }

    // Check if teacher exists
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      throw createError(404, "Teacher not found.");
    }

    // Create a reset password token
    const token = createJsonWebToken(
      {
        email: teacher.email,
      },
      process.env.JWT_PASSWORD_KEY,
      10 * 60 * 1000
    );

    const time = localTime(10);

    // Prepare email data
    const emailData = {
      email,
      subject: "Reset Password",
      html: `
        <div style="background-color: rgba(175, 175, 175, 0.455); width: 100%; min-width: 350px; padding: 1rem; box-sizing: border-box;">
          <p style="font-size: 25px; font-weight: 500; text-align: center; color: tomato;">ABS E-Commerce</p>
          <h2 style="font-size: 30px; font-weight: 700; text-align: center; color: green;">Hello ${teacher.name}</h2>
          <p style="margin: 0 auto; font-size: 22px; font-weight: 500; text-align: center; color: black;">This is a confirmation Email for reset password. We got a request from your Email address to reset password. <br /> If you are not this requested person then ignore this Email.</p>
          <p style="text-align: center;">
            <a style="margin: 0 auto; text-align: center; background-color: #34eb34; font-size: 25px; box-shadow: 0 0 5px black; color: black; font-weight: 700; padding: 5px 10px; text-decoration: none;" href="${process.env.CLIENT_URL_2}/auth/reset-password/${token}" target="_blank">Click Here </a>
          </p>
          <p style="text-align: center; font-size: 18px; color: black;">to get reset password form.</p>
          <p style="text-align: center;">
            <b style="color: red; font-size: 20px;">This Email will expire in <span style="color: black;">${time.expireTime}</span>, Reset Password before this time.</b>
          </p>
        </div>
      `,
    };

    // Attempt to send reset password email
    try {
      await sendEmailWithNode(emailData);
    } catch (error) {
      throw createError(500, "Failed to send verification email.");
    }

    // Respond with success message
    res.status(200).json({
      success: true,
      message: `An email has been sent to ${teacher.email}. Please check the email to reset your password.`,
    });
  } catch (error) {
    next(error);
  }
};
exports.resetTeacherPassword = async (req, res, next) => {
  try {
    const { newPassword, confirmPassword, token } = req.body;

    // Ensure token is present
    if (!token) {
      throw createError(400, "Token is required.");
    }

    // Ensure password and confirm password match
    if (newPassword !== confirmPassword) {
      throw createError(400, "New password and confirm password do not match.");
    }

    try {
      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_PASSWORD_KEY);
      if (!decoded) {
        throw createError(
          401,
          "Invalid token. It may have expired or be incorrect."
        );
      }

      // Find the teacher based on email
      const teacher = await Teacher.findOne({ email: decoded.email });
      if (!teacher) {
        throw createError(404, "Teacher not found.");
      }

      // Update the password
      teacher.password = newPassword;
      teacher.updateDate = localTime(0);

      // Save the updated teacher record
      await teacher.save();

      res.status(200).json({
        success: true,
        message: "Password has been reset successfully.",
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

exports.updateTeacherEmailRequest = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Ensure password is provided and matches
    const teacherData = await Teacher.findById(req.teacher.id).select(
      "+password"
    );

    const isPasswordMatch = await teacherData.comparedPassword(password);
    if (!isPasswordMatch) {
      throw createError(401, "Incorrect password.");
    }

    // Check if email is already in use
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      throw createError(400, "Email already in use.");
    }

    // Create JWT token for email verification
    const token = createJsonWebToken(
      { email, id: req.teacher.id },
      process.env.JWT_CHANGE_EMAIL_KEY,
      10 * 60 * 1000
    );

    const expirationTime = localTime(10);

    // Prepare email content
    const emailData = {
      email,
      subject: "Verify Email",
      html: `
        <div style="background-color: rgba(175, 175, 175, 0.455); width: 100%; min-width: 350px; padding: 1rem; box-sizing: border-box;">
          <p style="font-size: 25px; font-weight: 500; text-align: center; color: tomato;">ABS E-Commerce</p>
          <h2 style="font-size: 30px; font-weight: 700; text-align: center; color: green;">Hello ${req.teacher.name}</h2>
          <p style="margin: 0 auto; font-size: 22px; font-weight: 500; text-align: center; color: black;">
            We received a request to change the email associated with your account. If you did not request this change, please ignore this email.
          </p>
          <p style="text-align: center;">
            <a style="margin: 0 auto; text-align: center; background-color: #34eb34; font-size: 25px; box-shadow: 0 0 5px black; color: black; font-weight: 700; padding: 5px 10px; text-decoration: none;" href="${process.env.CLIENT_URL_2}/mail-update/${token}" target="_blank">Click Here</a>
          </p>
          <p style="text-align: center; font-size: 18px; color: black;">to update your email address.</p>
          <p style="text-align: center;">
            <b style="color: red; font-size: 20px; text-align: center;">This email will expire in <span style="color: black;">${expirationTime.expireTime}</span>, please verify your email before it expires.</b>
          </p>
        </div>
      `,
    };

    // Send email with the generated token
    try {
      await sendEmailWithNode(emailData);
    } catch (error) {
      throw createError(500, "Failed to send verification email.");
    }

    res.status(200).json({
      success: true,
      message: `An email has been sent to ${email}. Please check your inbox to update your email address. ${token}`,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTeacherEmailConfirm = async (req, res, next) => {
  try {
    const { token } = req.body;

    // Check if token exists in the request
    if (!token) {
      throw createError(400, "Token not provided.");
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_CHANGE_EMAIL_KEY);
    } catch (err) {
      throw createError(401, "Invalid or expired token.");
    }

    const { email, id } = decoded;

    // Update teacher's email in the database
    const updateDate = localTime(0);
    const teacher = await Teacher.findByIdAndUpdate(
      id,
      { email, updateDate },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    // Check if the teacher exists after the update
    if (!teacher) {
      throw createError(404, "Teacher not found or email update failed.");
    }

    res.status(200).json({
      success: true,
      message: "Email updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// Function to get all teachers with filters
exports.getAllTeacher = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      post,
      department,
      isApproved,
      isBan,
      sortBy,
      sortOrder,
      page = 1,
      limit = 10,
      search,
    } = req.query;

    // Build the filter object
    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (email) filter.email = { $regex: email, $options: "i" };
    if (phone) filter.phone = { $regex: phone, $options: "i" };
    if (post) filter.post = { $regex: post, $options: "i" };
    if (department) filter.department = { $regex: department, $options: "i" };
    if (isApproved) filter.isApproved = isApproved === "true";
    if (isBan) filter.isBan = isBan === "true";

    // Search across multiple fields
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { post: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
      ];
    }

    // Build the sort object
    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Fetch teachers with filters, sorting, and pagination
    const teachers = await Teacher.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select("-password"); // Exclude password field

    // Count total documents for pagination
    const totalTeachers = await Teacher.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: teachers.length,
      total: totalTeachers,
      page: parseInt(page),
      limit: parseInt(limit),
      teachers,
    });
  } catch (error) {
    next(error);
  }
};

// Function to get teacher details by ID
exports.getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      throw createError(404, "Teacher not found.");
    }
    res.status(200).json({
      success: true,
      teacher,
    });
  } catch (error) {
    next(error);
  }
};

// Function to register a new teacher
exports.registerTeacherByAdmin = async (req, res, next) => {
  try {
    const {
      password,
      confirmPassword,
      name,
      email,
      phone,
      nId,
      department,
      post,
      teacherId,
      address,
    } = req.body;

    if (password !== confirmPassword) {
      throw createError(400, "Password and Confirm Password did not match.");
    }

    const createDate = localTime(0);
    const updateDate = localTime(0);

    let avatar = { public_id: "", url: "" };

    if (req.file && req.file.path) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "teachers",
      });
      avatar.public_id = uploadResult.public_id;
      avatar.url = uploadResult.secure_url;
    } else {
      throw createError(400, "Avatar image is required.");
    }

    const teacher = await Teacher.create({
      name,
      email,
      phone,
      nId,
      teacherId,
      password,
      avatar,
      department,
      post,
      address,
      createDate,
      updateDate,
      isApproved: true,
      createdBy: req.admin.id,
    });

    if (!teacher) {
      throw createError(401, "Unable to create teacher");
    }

    const emailData = {
      email,
      subject:
        "Welcome to Library Management System - Account Created Successfully",
      html: `
        <div style="background-color: #f4f4f4; width: 100%; min-width: 350px; padding: 10px; box-sizing: border-box; font-family: Arial, sans-serif;">
          <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 10px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            <h1 style="text-align: center; color: #d9534f; margin-bottom: 10px;">Library Management System</h1>
            <h2 style="text-align: center; color: #5cb85c;">Account Created Successfully!</h2>
            <p style="text-align: center; font-size: 18px; color: #333;">Congratulations, <strong>${teacher.name}</strong>! 🎉 Your account has been successfully created.</p>
            <div style="text-align: center; margin: 10px 0;">
              <p style="font-size: 16px; color: #555;">You can now log in and start managing your library resources.</p>
              <a href="${process.env.CLIENT_URL_2}/login" style="display: inline-block; background-color: #0275d8; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: bold; padding: 10px 20px; border-radius: 5px;">
                Login Now
              </a>
            </div>
            <p style="text-align: center; font-size: 16px; color: #555;">If you did not create this account, please contact our support team immediately.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;">
            <p style="text-align: center; font-size: 14px; color: #777;">Thank you for joining us! 📚<br> Library Management System Team</p>
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
      teacher,
    });
  } catch (error) {
    next(error);
  }
};

// Function to update a teacher's profile
exports.updateTeacherProfileByAdmin = async (req, res, next) => {
  try {
    const { name, phone, email, nId, teacherId, department, post, address } =
      req.body;

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      throw createError(
        400,
        "Unable to update Profile. Teacher does not exist."
      );
    }

    const updatedData = {
      name: name || teacher.name,
      email: email || teacher.email,
      phone: phone || teacher.phone,
      nId: nId || teacher.nId,
      teacherId: teacherId || teacher.teacherId,
      department: department || teacher.department,
      post: post || teacher.post,
      address: address || teacher.address,
      updateDate: localTime(0),
      isApproved: true,
      updatedBy: req.admin.id,
    };

    if (req.file && req.file.path) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "teachers",
      });
      await cloudinary.uploader.destroy(teacher.avatar.public_id);
      updatedData.avatar = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({ success: true, teacher: updatedTeacher });
  } catch (error) {
    next(error);
  }
};

// Function to approve a teacher
exports.approveTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

// Function to ban a teacher
exports.banTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { isBan: true },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

// Function to unban a teacher
exports.unbanTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { isBan: false },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
