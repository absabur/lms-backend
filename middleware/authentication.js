const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel.js");
const Admin = require("../models/adminModel.js");
const Teacher = require("../models/teacherModel.js");
const connectDB = require("../config/db.js");

exports.isStudentForCompleteProfile = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.access_token !== undefined) {
      token = req.cookies.access_token;
    }

    if (!token || token === "null") {
      throw createError(401, "You must login first.");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw createError(404, "Login with correct information.");
    }
    const exist = await Student.findById(decoded.id);
    if (!exist) {
      throw createError(401, "You must login first.");
    }
    req.student = exist;
    next();
  } catch (error) {
    next(error);
  }
};
exports.isStudent = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.access_token !== undefined) {
      token = req.cookies.access_token;
    }

    if (!token || token === "null") {
      throw createError(401, "You must login first.");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw createError(404, "Login with correct information.");
    }
    const exist = await Student.findById(decoded.id);
    if (!exist) {
      throw createError(401, "You must login first.");
    }
    try {
      if (exist) await exist.validate();
    } catch (validationError) {
      throw createError(401, "Complete Your Profile");
    }
    if (!exist.isApproved) {
      throw createError(401, "Your account is not approved.");
    }
    if (exist.isBan) {
      throw createError(
        402,
        "Unfortunately you are ban now, please contact to author."
      );
    }
    req.student = exist;
    next();
  } catch (error) {
    next(error);
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.access_token !== undefined) {
      token = req.cookies.access_token;
    }

    if (!token || token === "null") {
      throw createError(401, "You must login first.");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw createError(404, "Login with correct information.");
    }
    const exist = await Admin.findById(decoded.id);
    if (!exist) {
      throw createError(401, "You are not a admin.");
    }
    if (!exist.isApproved) {
      throw createError(401, "Your account is not approved.");
    }

    if (exist.isBan === true) {
      throw createError(
        402,
        "Unfortunately you are ban now, please contact to author."
      );
    }
    req.admin = exist;
    next();
  } catch (error) {
    next(error);
  }
};

exports.isSuperAdmin = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.access_token !== undefined) {
      token = req.cookies.access_token;
    }

    if (!token || token === "null") {
      throw createError(401, "You must login first.");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw createError(404, "Login with correct information.");
    }
    const exist = await Admin.findById(decoded.id);
    if (!exist) {
      throw createError(401, "You are not a teacher.");
    }

    if (!exist.isApproved) {
      throw createError(401, "Your account is not approved.");
    }
    if (exist.isBan) {
      throw createError(
        402,
        "Unfortunately you are ban now, please contact to author."
      );
    }
    if (!exist.isSuperAdmin) {
      throw createError(401, "You don't have this authority.");
    }
    req.admin = exist;
    next();
  } catch (error) {
    next(error);
  }
};

exports.isTeacherForCompleteProfile = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.access_token !== undefined) {
      token = req.cookies.access_token;
    }

    if (!token || token === "null") {
      throw createError(401, "You must login first.");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw createError(404, "Login with correct information.");
    }
    const exist = await Teacher.findById(decoded.id);
    if (!exist) {
      throw createError(401, "You must login first.");
    }

    req.teacher = exist;
    next();
  } catch (error) {
    next(error);
  }
};
exports.isTeacher = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.access_token !== undefined) {
      token = req.cookies.access_token;
    }

    if (!token || token === "null") {
      throw createError(401, "You must login first.");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw createError(404, "Login with correct information.");
    }
    const exist = await Teacher.findById(decoded.id);
    if (!exist) {
      throw createError(401, "You must login first.");
    }
    try {
      if (exist) await exist.validate();
    } catch (validationError) {
      throw createError(401, "Complete Your Profile");
    }
    if (!exist.isApproved) {
      throw createError(401, "Your account is not approved.");
    }
    if (exist.isBan) {
      throw createError(
        402,
        "Unfortunately you are ban now, please contact to author."
      );
    }
    req.teacher = exist;
    next();
  } catch (error) {
    next(error);
  }
};

exports.connectDB = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
};
