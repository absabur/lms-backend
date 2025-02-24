const { Schema, model } = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const otpSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter email."],
        trim: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    otp: {
        type: Number,
        required: [true, "Please enter otp."],
    },
    role: {
        type: String,
        required: [true, "Please enter role."],
    },
    createDate: {
        type: Object,
    },
    expireDate: {
        type: Object,
    }
});



const Otp = model('Otp', otpSchema);

module.exports = Otp;