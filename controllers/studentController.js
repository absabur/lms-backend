const crypto = require("crypto");
const createError = require("http-errors");
const { localTime } = require("../utils/localTime.js");
const Student = require("../models/studentModel.js");
const sendEmailWithNode = require("../config/nodemailer.js");
const Otp = require("../models/otpModel.js");
const cloudinary = require("../config/cloudinary.js");
const { jwtToken } = require("../utils/jwtToken.js");
const { createJsonWebToken } = require("../utils/createToken.js");
const jwt = require("jsonwebtoken");

// Sign-up and OTP verification logic
exports.SignUpVerifyStudent = async (req, res, next) => {
  try {
    const { email } = req.body;

    const student = await Student.findOne({ email });
    if (student) {
      return next(createError(400, "Email already in use."));
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const createDate = localTime();
    const expireDate = localTime(10);

    // Remove any existing OTP
    await Otp.deleteOne({ email });

    // Create a new OTP record
    const otp = await Otp.create({
      email,
      otp: verificationCode,
      role: "student",
      createDate,
      expireDate,
    });

    // Send OTP email
    const emailData = {
      email,
      subject: "Verify Your Email - Library Management System",
      html: `
          <div style="background-color: #f4f4f4; width: 100%; min-width: 350px; padding: 10px; box-sizing: border-box; font-family: Arial, sans-serif;">
            <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 10px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
              <h1 style="text-align: center; color: #d9534f;">Library Management System</h1>
              <h2 style="text-align: center; color: #5cb85c;">Hello There,</h2>
              <p style="text-align: center; font-size: 18px; color: #333;">Use the following verification code to verify your email:</p>
              <div style="text-align: center; margin: 10px 0;">
                <span style="font-size: 28px; font-weight: bold; color: #0275d8; background: #e9ecef; padding: 10px 20px; border-radius: 5px; letter-spacing: 2px;">
                  ${verificationCode}
                </span>
              </div>
              <p style="text-align: center; font-size: 16px; color: #555;">
                This code will expire in <strong style="color: #d9534f;">${expireDate.expireTime}</strong>.
              </p>
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

// Register student logic
exports.registerStudent = async (req, res, next) => {
  try {
    const {
      password,
      confirmPassword,
      verificationCode,
      name,
      banglaName,
      fathersName,
      mothersName,
      email,
      phone,
      addmissionRoll,
      boardRoll,
      registration,
      department,
      session,
      shift,
      district,
      upazila,
      union,
      village,
      address,
    } = req.body;

    if (password !== confirmPassword) {
      return next(
        createError(400, "Password and Confirm Password did not match.")
      );
    }

    if (!verificationCode) {
      return next(createError(400, "Invalid or expired verification code."));
    }

    const otp = await Otp.findOne({ email, otp: verificationCode });

    if (!otp) {
      return next(createError(400, "Invalid or expired verification code."));
    }

    const createDate = localTime(0);
    const updateDate = localTime(0);
    const givenTime = new Date(
      `${otp.expireDate.date} ${otp.expireDate.expireTime}`
    );
    const currentTime = new Date(`${createDate.date} ${createDate.time}`);

    if (currentTime > givenTime) {
      await Otp.deleteOne({ email, otp: verificationCode, role: "student" });
      return next(createError(400, "OTP has expired."));
    }

    let avatar = { public_id: "", url: "" };

    if (req.file?.path) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "students",
      });
      avatar.public_id = uploadedImage.public_id;
      avatar.url = uploadedImage.secure_url;
    } else {
      return next(createError(400, "Avatar image is required."));
    }

    const student = await Student.create({
      name,
      email,
      phone,
      registration,
      session,
      shift,
      password,
      avatar,
      banglaName,
      fathersName,
      mothersName,
      addmissionRoll,
      boardRoll,
      department,
      district,
      upazila,
      union,
      village,
      address,
      createDate,
      updateDate,
    });

    if (!student) {
      return next(createError(401, "Unable to create student"));
    }

    await Otp.deleteOne({ email, otp: verificationCode });

    const emailData = {
      email,
      subject:
        "Welcome to Library Management System - Account Created Successfully",
      html: `
          <div style="background-color: #f4f4f4; width: 100%; min-width: 350px; padding: 10px; box-sizing: border-box; font-family: Arial, sans-serif;">
            <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 10px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
              <h1 style="text-align: center; color: #d9534f;">Library Management System</h1>
              <h2 style="text-align: center; color: #5cb85c;">Account Created Successfully!</h2>
              <p style="text-align: center; font-size: 18px; color: #333;">
                Congratulations, <strong>${student.name}</strong>! 🎉 Your account has been successfully created.
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
      return next(createError(500, "Failed to send verification email."));
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    next(error);
  }
};

// Login student logic
exports.loginStudent = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, "Please enter email and password"));
    }

    const student = await Student.findOne({ email }).select("+password");

    if (!student) {
      return next(createError(400, "Invalid email or password"));
    }

    const isPasswordMatch = await student.comparedPassword(password);
    if (!isPasswordMatch) {
      return next(createError(400, "Invalid email or password"));
    }

    const token = student.getJWTToken();
    await jwtToken(token, res);

    res.status(200).json({
      success: true,
      student,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Logout student logic
exports.logoutStudent = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Get student profile
exports.getStudentProfile = async (req, res, next) => {
  try {
    const student = await Student.findById(req.student.id).select("-password");

    if (!student) {
      return next(createError(404, "Student not found."));
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    next(error);
  }
};

// Update student password logic
exports.updateStudentPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const student = await Student.findById(req.student.id).select("+password");

    if (!student) {
      return next(
        createError(400, "Unable to update password. Student does not exist.")
      );
    }

    if (newPassword !== confirmPassword) {
      return next(
        createError(400, "New Password and Confirm New Password do not match.")
      );
    }

    const isPasswordMatch = await student.comparedPassword(oldPassword);
    if (!isPasswordMatch) {
      return next(createError(400, "Incorrect old password."));
    }

    student.password = newPassword;
    await student.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};
exports.updateStudentProfile = async (req, res, next) => {
  try {
    let {
      name,
      banglaName,
      fathersName,
      mothersName,
      phone,
      addmissionRoll,
      boardRoll,
      registration,
      department,
      session,
      shift,
      district,
      upazila,
      union,
      village,
      address,
    } = req.body;

    const student = await Student.findById(req.student.id);
    if (!student) {
      throw createError(
        400,
        "Unable to update Profile. Student does not exist."
      );
    }

    const updatedData = {
      name: name || student.name,
      banglaName: banglaName || student.banglaName,
      fathersName: fathersName || student.fathersName,
      mothersName: mothersName || student.mothersName,
      phone: phone || student.phone,
      addmissionRoll: addmissionRoll || student.addmissionRoll || "",
      boardRoll: boardRoll || student.boardRoll || "",
      registration: registration || student.registration || "",
      department: department || student.department,
      session: session || student.session,
      shift: shift || student.shift,
      district: district || student.district,
      upazila: upazila || student.upazila,
      union: union || student.union,
      village: village || student.village,
      address: address || student.address,
      updateDate: localTime(0),
      isApproved: false,
    };

    if (req.file?.path) {
      await cloudinary.uploader.upload(
        req.file.path,
        { folder: "students" },
        async (err, res) => {
          if (err) {
            throw createError(500, "Failed to upload avatar to Cloudinary.");
          }
          await cloudinary.uploader.destroy(student.avatar.public_id);
          updatedData.avatar = {
            public_id: res.public_id,
            url: res.secure_url,
          };
        }
      );
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.student.id,
      updatedData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({ success: true, student: updatedStudent });
  } catch (error) {
    next(error);
  }
};

exports.forgateStudentPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw createError(400, "Email is required.");

    const student = await Student.findOne({ email });
    if (!student) throw createError(404, "Student not found.");

    const token = createJsonWebToken(
      { email: student.email },
      process.env.JWT_PASSWORD_KEY,
      10*60*1000
    );
    const time = localTime(10);

    const emailData = {
      email,
      subject: "Reset Password",
      html: `
        <div style="background-color: rgba(175, 175, 175, 0.455); width: 100%; min-width: 350px; padding: 1rem; box-sizing: border-box;">
          <p style="font-size: 25px; font-weight: 500; text-align: center; color: tomato;">ABS E-Commerce</p>
          <h2 style="font-size: 30px; font-weight: 700; text-align: center; color: green;">Hello ${student.name}</h2>
          <p style="margin: 0 auto; font-size: 22px; font-weight: 500; text-align: center; color: black;">
            This is a confirmation Email for reset password. We got a request from your Email address to reset password. 
            <br /> If you are not this requested person then ignore this Email.
          </p>
          <p style="text-align: center;">
            <a style="margin: 0 auto; text-align: center; background-color: #34eb34; font-size: 25px; box-shadow: 0 0 5px black; color: black; font-weight: 700; padding: 5px 10px; text-decoration: none;" 
               href="${process.env.clientUrl}/reset-password/${token}" target="_blank">Click Here </a>
          </p>
          <p style="text-align: center; font-size: 18px; color: black;">to get reset password form.</p>
          <p style="text-align: center;">
            <b style="color: red; font-size: 20px; text-align: center;">This Email will expire in <span style="color: black;">${time.expireTime}</span>, Reset Password before <span style="color: black;">${time.expireTime}</span></b>
          </p>
        </div>
      `,
    };

    await sendEmailWithNode(emailData);

    res.status(200).json({
      success: true,
      message: `An email has been sent to ${student.email}. Please check the email and reset your password. ${token}`,
    });
  } catch (error) {
    next(error);
  }
};

exports.resetStudentPassword = async (req, res, next) => {
  try {
    const { newPassword, confirmPassword, token } = req.body;
    if (!token) throw createError(404, "Token not found.");

    if (newPassword !== confirmPassword) {
      throw createError(402, "Passwords do not match.");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_PASSWORD_KEY);

      if (!decoded)
        throw createError(
          401,
          "Unable to verify student. Token has expired or is invalid."
        );

      const student = await Student.findOne({ email: decoded.email });
      if (!student) {
        throw createError(
          400,
          "Unable to reset password. Admin does not exist."
        );
      }

      // Hash the new password before saving
      student.password = newPassword;
      student.updateDate = localTime(0);

      await student.save();

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
        throw createError(400, error);
      }
    }

    res.status(201).json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateStudentEmailRequest = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const studentData = await Student.findById(req.student.id).select(
      "+password"
    );

    const isPasswordMatch = await studentData.comparedPassword(password);
    if (!isPasswordMatch) {
      throw createError(401, "Incorrect password.");
    }

    const student = await Student.findOne({ email });
    if (student) {
      throw createError(400, "Email already in use.");
    }

    const token = createJsonWebToken(
      { email, id: req.student.id },
      process.env.JWT_CHANGE_EMAIL_KEY,
      10*60*1000
    );
    const time = localTime(10);

    const emailData = {
      email,
      subject: "Verify Email",
      html: `
        <div style="background-color: rgba(175, 175, 175, 0.455); width: 100%; min-width: 350px; padding: 1rem; box-sizing: border-box;">
          <p style="font-size: 25px; font-weight: 500; text-align: center; color: tomato;">ABS E-Commerce</p>
          <h2 style="font-size: 30px; font-weight: 700; text-align: center; color: green;">Hello ${req.student.name}</h2>
          <p style="margin: 0 auto; font-size: 22px; font-weight: 500; text-align: center; color: black;">
            We received a request to change your email address. If you did not make this request, please ignore this email.
          </p>
          <p style="text-align: center;">
            <a style="margin: 0 auto; text-align: center; background-color: #34eb34; font-size: 25px; box-shadow: 0 0 5px black; color: black; font-weight: 700; padding: 5px 10px; text-decoration: none;" 
               href="${process.env.clientUrl}/mail-update/${token}" target="_blank">Click Here </a>
          </p>
          <p style="text-align: center; font-size: 18px; color: black;">to update your email address.</p>
          <p style="text-align: center;">
            <b style="color: red; font-size: 20px; text-align: center;">This Email will expire in <span style="color: black;">${time.expireTime}</span>, Verify Email before <span style="color: black;">${time.expireTime}</span></b>
          </p>
        </div>
      `,
    };

    await sendEmailWithNode(emailData);

    res.status(200).json({
      success: true,
      message: `An email has been sent to ${email}. Please check the email and update from there. ${token}`,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateStudentEmailConfirm = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) throw createError(404, "Token not found.");

    const decoded = jwt.verify(token, process.env.JWT_CHANGE_EMAIL_KEY);
    if (!decoded) throw createError(401, "Invalid or expired token.");

    const { email, id } = decoded;
    const updateDate = localTime(0);

    const student = await Student.findByIdAndUpdate(
      id,
      { email, updateDate, isApproved: false },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (!student) throw createError(400, "Student not found.");

    res.status(200).json({
      success: true,
      message: "Email updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllStudent = async (req, res, next) => {
  try {
    const {
      name,
      banglaName,
      fathersName,
      mothersName,
      email,
      phone,
      department,
      session,
      shift,
      district,
      upazila,
      union,
      village,
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
    if (banglaName) filter.banglaName = { $regex: banglaName, $options: "i" };
    if (fathersName)
      filter.fathersName = { $regex: fathersName, $options: "i" };
    if (mothersName)
      filter.mothersName = { $regex: mothersName, $options: "i" };
    if (email) filter.email = { $regex: email, $options: "i" };
    if (phone) filter.phone = { $regex: phone, $options: "i" };
    if (department) filter.department = { $regex: department, $options: "i" };
    if (session) filter.session = { $regex: session, $options: "i" };
    if (shift) filter.shift = { $regex: shift, $options: "i" };
    if (district) filter.district = { $regex: district, $options: "i" };
    if (upazila) filter.upazila = { $regex: upazila, $options: "i" };
    if (union) filter.union = { $regex: union, $options: "i" };
    if (village) filter.village = { $regex: village, $options: "i" };
    if (isApproved) filter.isApproved = isApproved === "true";
    if (isBan) filter.isBan = isBan === "true";

    // Search across multiple fields
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { banglaName: { $regex: search, $options: "i" } },
        { fathersName: { $regex: search, $options: "i" } },
        { mothersName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
        { session: { $regex: search, $options: "i" } },
        { shift: { $regex: search, $options: "i" } },
        { district: { $regex: search, $options: "i" } },
        { upazila: { $regex: search, $options: "i" } },
        { union: { $regex: search, $options: "i" } },
        { village: { $regex: search, $options: "i" } },
      ];
    }

    // Build the sort object
    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Fetch students with filters, sorting, and pagination
    const students = await Student.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select("-password"); // Exclude password field

    // Count total documents for pagination
    const totalStudents = await Student.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: students.length,
      total: totalStudents,
      page: parseInt(page),
      limit: parseInt(limit),
      students,
    });
  } catch (error) {
    next(error);
  }
};

// Get student by ID
exports.getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      throw createError(404, "Student not found.");
    }
    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    next(error);
  }
};

// Register new student by admin
exports.registerStudentByAdmin = async (req, res, next) => {
  try {
    const {
      password,
      confirmPassword,
      name,
      banglaName,
      fathersName,
      mothersName,
      email,
      phone,
      addmissionRoll,
      boardRoll,
      registration,
      department,
      session,
      shift,
      district,
      upazila,
      union,
      village,
      address,
    } = req.body;

    if (password !== confirmPassword) {
      throw createError(400, "Password and Confirm Password do not match.");
    }

    let avatar = { public_id: "", url: "" };

    if (req.file?.path) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "students",
      });
      avatar.public_id = uploadedImage.public_id;
      avatar.url = uploadedImage.secure_url;
    } else {
      return next(createError(400, "Avatar image is required."));
    }

    const student = await Student.create({
      name,
      email,
      phone,
      registration,
      session,
      shift,
      password,
      avatar,
      banglaName,
      fathersName,
      mothersName,
      addmissionRoll,
      boardRoll,
      department,
      district,
      upazila,
      union,
      village,
      address,
      createDate: localTime(0),
      updateDate: localTime(0),
      isApproved: true,
      createdBy: req.admin.id,
    });

    if (!student) {
      throw createError(401, "Unable to create student.");
    }

    const emailData = createStudentEmail(student);

    try {
      await sendEmailWithNode(emailData);
    } catch (error) {
      throw createError(500, "Failed to send verification email.");
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    next(error);
  }
};

// Update student profile by admin
exports.updateStudentProfileByAdmin = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      throw createError(400, "Student not found.");
    }

    let updatedData = {
      name: req.body.name || student.name,
      email: req.body.email || student.email,
      banglaName: req.body.banglaName || student.banglaName,
      fathersName: req.body.fathersName || student.fathersName,
      mothersName: req.body.mothersName || student.mothersName,
      phone: req.body.phone || student.phone,
      addmissionRoll: req.body.addmissionRoll || student.addmissionRoll,
      boardRoll: req.body.boardRoll || student.boardRoll,
      registration: req.body.registration || student.registration,
      department: req.body.department || student.department,
      session: req.body.session || student.session,
      shift: req.body.shift || student.shift,
      district: req.body.district || student.district,
      upazila: req.body.upazila || student.upazila,
      union: req.body.union || student.union,
      village: req.body.village || student.village,
      address: req.body.address || student.address,
      isApproved: true,
      updateDate: localTime(0),
      updatedBy: req.admin.id,
    };

    if (req.file?.path) {
      await cloudinary.uploader.upload(
        req.file.path,
        { folder: "students" },
        async (err, res) => {
          if (err) {
            throw createError(500, "Failed to upload avatar.");
          }

          await cloudinary.uploader.destroy(student.avatar.public_id);
          updatedData.avatar = {
            public_id: res.public_id,
            url: res.secure_url,
          };
        }
      );
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      student: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

// Approve student
exports.approveStudent = async (req, res, next) => {
  try {
    await Student.findByIdAndUpdate(
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

// Ban student
exports.banStudent = async (req, res, next) => {
  try {
    await Student.findByIdAndUpdate(
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

// Unban student
exports.unbanStudent = async (req, res, next) => {
  try {
    await Student.findByIdAndUpdate(
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

// Helper function to handle avatar upload
const uploadAvatar = async (filePath) => {
  try {
    const res = await cloudinary.uploader.upload(filePath, {
      folder: "students",
    });
    return {
      public_id: res.public_id,
      url: res.secure_url,
    };
  } catch (error) {
    throw createError(500, "Avatar upload failed.");
  }
};

// Helper function to create student registration email
const createStudentEmail = (student) => {
  return {
    email: student.email,
    subject:
      "Welcome to Library Management System - Account Created Successfully",
    html: `
      <div style="background-color: #f4f4f4; width: 100%; min-width: 350px; padding: 10px; box-sizing: border-box; font-family: Arial, sans-serif;">
        <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 10px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
          <h1 style="text-align: center; color: #d9534f; margin-bottom: 10px;">Library Management System</h1>
          <h2 style="text-align: center; color: #5cb85c;">Account Created Successfully!</h2>
          
          <p style="text-align: center; font-size: 18px; color: #333;">
            Congratulations, <strong>${student.name}</strong>! 🎉 Your account has been successfully created.
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
};
