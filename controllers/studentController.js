const crypto = require("crypto");
const createError = require("http-errors");
const { localTime } = require("../utils/localTime.js");
const Student = require("../models/studentModel.js");
const sendEmailWithNode = require("../config/nodemailer.js");
const Otp = require("../models/otpModel.js");
const cloudinary = require("../config/cloudinary.js");
const upload = require("../utils/multer.js");

exports.SignUpVerify = async (req, res, next) => {
  try {
    const { email } = req.body;

    const student = await Student.findOne({ email });
    if (student) {
      throw createError(400, "Email already in use.");
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();

    const createDate = localTime();
    const expireDate = localTime(5);

    const otpExists = await Otp.findOne({ email });
    if (otpExists) {
      await Otp.deleteOne({ email });
    }

    const otp = await Otp.create({
      email,
      otp: verificationCode,
      createDate,
      expireDate,
    });
    const emailData = {
      email,
      subject: "Verify Your Email - Library Management System",
      html: `
          <div style="background-color: #f4f4f4; width: 100%; min-width: 350px; padding: 20px; box-sizing: border-box; font-family: Arial, sans-serif;">
            <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
              <h1 style="text-align: center; color: #d9534f; margin-bottom: 10px;">Library Management System</h1>
              <h2 style="text-align: center; color: #5cb85c;">Hello There,</h2>
              <p style="text-align: center; font-size: 18px; color: #333;">Use the following verification code to verify your email:</p>
              
              <div style="text-align: center; margin: 20px 0;">
                <span style="display: inline-block; font-size: 28px; font-weight: bold; color: #0275d8; background: #e9ecef; padding: 10px 20px; border-radius: 5px; letter-spacing: 2px;">
                  ${verificationCode}
                </span>
              </div>
      
              <p style="text-align: center; font-size: 16px; color: #555;">
                This code will expire in <strong style="color: #d9534f;">${expireDate.expireTime}</strong>.
              </p>
      
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
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

exports.registerStudent = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      roll,
      registration,
      department,
      session,
      shift,
      group,
      password,
      confirmPassword,
      address,
      verificationCode,
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
      await Otp.deleteOne({ email, otp: verificationCode });
      throw createError(400, "OTP has expired.");
    }

    let avatar = {
      public_id: "",
      url: "",
    };
    
    if (req.file.path) {
        await cloudinary.uploader.upload(req.file.path, { folder: "students" }, (err, res) => {
            if (err) {
                throw createError(500, "Failed to upload avatar to Cloudinary.");
            }
            
            avatar.public_id = res.public_id;
            avatar.url = res.secure_url;
        });
    } else {
        throw createError(400, "Avatar image is required.");
    }
    
    const student = await Student.create({
      name,
      email,
      phone,
      roll,
      registration,
      department,
      session,
      shift,
      group,
      password,
      avatar,
      address,
      createDate,
      updateDate,
    });

    if (!student) {
      throw createError(401, "Unable to create student");
    }

    await Otp.deleteOne({ email, otp: verificationCode });

    // Send success email
    const emailData = {
      email,
      subject:
        "Welcome to Library Management System - Account Created Successfully",
      html: `
          <div style="background-color: #f4f4f4; width: 100%; min-width: 350px; padding: 20px; box-sizing: border-box; font-family: Arial, sans-serif;">
            <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
              <h1 style="text-align: center; color: #d9534f; margin-bottom: 10px;">Library Management System</h1>
              <h2 style="text-align: center; color: #5cb85c;">Account Created Successfully!</h2>
              
              <p style="text-align: center; font-size: 18px; color: #333;">
                Congratulations, <strong>${student.name}</strong>! 🎉 Your account has been successfully created.
              </p>
      
              <div style="text-align: center; margin: 20px 0;">
                <p style="font-size: 16px; color: #555;">You can now log in and start managing your library resources.</p>
                <a href="${process.env.clientUrl}/login" 
                   style="display: inline-block; background-color: #0275d8; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: bold; padding: 10px 20px; border-radius: 5px;">
                  Login Now
                </a>
              </div>
      
              <p style="text-align: center; font-size: 16px; color: #555;">
                If you did not create this account, please contact our support team immediately.
              </p>
      
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
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
      student,
    });
  } catch (error) {
    next(error);
  }
};
