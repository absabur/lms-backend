const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const teacherSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name."],
    trim: true,
    minlength: [3, "Teacher Name must be atleast 3 charecter."],
    maxlength: [50, "Teacher Name allowed max 50 charecter."],
  },
  email: {
    type: String,
    required: [true, "Please enter email."],
    trim: true,
    unique: [true, "Email already in use"],
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  phone: {
    type: String,
    required: [true, "Please enter phone."],
    trim: true,
    unique: [true, "Phone already in use"],
    minlength: [11, "Phone number must be atleast 11 charecter."],
  },
  nId: {
    type: Number,
    unique: [true, "NID already in use"],
  },
  teacherId: {
    type: Number,
    unique: [true, "TeacherId already in use"],
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Please enter Post."],
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: [true, "Please enter Department."],
  },
  address: {
    type: String,
    required: [true, "Please enter address."],
    trim: true
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isBan: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    default: null,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    default: null,
  },
  createDate: {
    type: Object,
  },
  updateDate: {
    type: Object,
  },
});

teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

teacherSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRE) * 24 * 60 * 60 * 1000,
  });
};

teacherSchema.methods.comparedPassword = async function (pass) {
  return await bcryptjs.compare(pass, this.password);
};

const Teacher = model("Teacher", teacherSchema);

module.exports = Teacher;
