const createError = require("http-errors");
const jwt= require("jsonwebtoken");
const Student = require("../models/studentModel.js");
const Admin = require("../models/adminModel.js");
const Teacher = require("../models/teacherModel.js");

exports.isStudent = async (req, res, next) => {
    try {
        let token;
        if (req.cookies.access_token !== undefined) {
            token = req.cookies.access_token
        }else {
            token = req.headers.access_token
        }
        
        if (!token || token === "null") {
            throw createError(401, "You must login first.")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            throw createError(404, "Login with correct information.")
        }
        const exist = await Student.findById(decoded.id)
        if (!exist) {
            throw createError(401, "You are not a student.")
        }
        if (exist.isBan === true || exist.isBan === 'true') {
            throw createError(402, "Unfortunately you are ban now, please contact to author.")
        }
        req.student = exist;
        next()
    } catch (error) {
        next(error)
    }
}



exports.inStudentBan = async (req, res, next) => {
    try {
        const student = req.student;
        const studentDetails = await Student.findById(student.id)
        if (studentDetails?.isBan) {
            throw createError(402, "Unfortunately you are ban now, please contact to author.")
        }
        next()
    } catch (error) {
        next(error);
    }
}



exports.isAdmin = async (req, res, next) => {
    try {
        let token;
        if (req.cookies.access_token !== undefined) {
            token = req.cookies.access_token
        }else {
            token = req.headers.access_token
        }
        
        if (!token || token === "null") {
            throw createError(401, "You must login first.")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            throw createError(404, "Login with correct information.")
        }
        const exist = await Admin.findById(decoded.id)
        if (!exist) {
            throw createError(401, "You are not a admin.")
        }
        
        if (exist.isBan === true || exist.isBan === 'true') {
            throw createError(402, "Unfortunately you are ban now, please contact to author.")
        }
        req.admin = exist;
        next()
    } catch (error) {
        next(error)
    }
}


exports.isSuperAdmin = async (req, res, next) => {
    try {
        let token;
        if (req.cookies.access_token !== undefined) {
            token = req.cookies.access_token
        }else {
            token = req.headers.access_token
        }
        
        if (!token || token === "null") {
            throw createError(401, "You must login first.")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            throw createError(404, "Login with correct information.")
        }
        const exist = await Admin.findById(decoded.id)
        if (!exist) {
            throw createError(401, "You are not a teacher.")
        }
        
        if (exist.isBan === true || exist.isBan === 'true') {
            throw createError(402, "Unfortunately you are ban now, please contact to author.")
        }
        if (exist.isSuperAdmin !== "true" || exist.isSuperAdmin !== true) {
            throw createError(401, "You don't have this authority.")
        }
        req.admin = exist;
        next()
    } catch (error) {
        next(error)
    }
}


exports.isAdminBan = async (req, res, next) => {
    try {
        const admin = req.admin;
        const adminDetails = await Admin.findById(admin.id)
        if (adminDetails?.isBan) {
            throw createError(402, "Unfortunately you are ban now, please contact to author.")
        }
        next()
    } catch (error) {
        next(error);
    }
}



exports.isTeacher = async (req, res, next) => {
    try {
        let token;
        if (req.cookies.access_token !== undefined) {
            token = req.cookies.access_token
        }else {
            token = req.headers.access_token
        }
        
        if (!token || token === "null") {
            throw createError(401, "You must login first.")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            throw createError(404, "Login with correct information.")
        }
        const exist = await Teacher.findById(decoded.id)
        if (!exist) {
            throw createError(401, "You are not a student.")
        }
        
        if (exist.isBan === true || exist.isBan === 'true') {
            throw createError(402, "Unfortunately you are ban now, please contact to author.")
        }
        req.teacher = exist;
        next()
    } catch (error) {
        next(error)
    }
}



exports.isTeacherBan = async (req, res, next) => {
    try {
        const teacher = req.teacher;
        const teacherDetails = await Teacher.findById(teacher.id)
        if (teacherDetails?.isBan) {
            throw createError(402, "Unfortunately you are ban now, please contact to author.")
        }
        next()
    } catch (error) {
        next(error);
    }
}