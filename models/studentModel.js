const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter Your name."],
    trim: true,
    minlength: [3, "Student Name must be atleast 3 charecter."],
    maxlength: [50, "Student Name allowed max 50 charecter."],
  },
  banglaName: {
    type: String,
    required: [true, "Please enter Your name."],
    trim: true,
    minlength: [3, "Student Name must be atleast 3 charecter."],
    maxlength: [50, "Student Name allowed max 50 charecter."],
  },
  fathersName: {
    type: String,
    required: [true, "Please enter Your name."],
    trim: true,
    minlength: [3, "Fathers Name must be atleast 3 charecter."],
    maxlength: [50, "Fathers Name allowed max 50 charecter."],
  },
  mothersName: {
    type: String,
    required: [true, "Please enter Your name."],
    trim: true,
    minlength: [3, "Mothers Name must be atleast 3 charecter."],
    maxlength: [50, "Mothers Name allowed max 50 charecter."],
  },
  email: {
    type: String,
    required: [true, "Please enter email."],
    trim: true,
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  phone: {
    type: String,
    required: [true, "Please enter phone."],
    trim: true,
    unique: true,
    minlength: [11, "Phone number must be atleast 11 charecter."],
  },
  addmissionRoll: {
    type: Number,
    unique: true,
  },
  boardRoll: {
    type: Number,
    unique: true,
  },
  registration: {
    type: Number,
    unique: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: [true, "Please enter department."],
  },
  session: {
    type: Schema.Types.ObjectId,
    ref: "Session",
    required: [true, "Please enter session."],
  },
  shift: {
    type: Schema.Types.ObjectId,
    ref: "Shift",
    required: [true, "Please enter shift."],
  },
  district: {
    type: Schema.Types.ObjectId,
    ref: "District",
    required: [true, "Please enter district."],
  },
  upazila: {
    type: Schema.Types.ObjectId,
    ref: "Upazila",
    required: [true, "Please enter upazila."],
  },
  union: {
    type: String,
    required: [true, "Please enter union."],
    trim: true,
  },
  village: {
    type: String,
    required: [true, "Please enter village."],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Please enter address."],
    trim: true,
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
      required: [true, "Profile image is required"],
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

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

studentSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRE) * 24 * 60 * 60 * 1000,
  });
};

studentSchema.methods.comparedPassword = async function (pass) {
  return await bcryptjs.compare(pass, this.password);
};

const Student = model("Student", studentSchema);

module.exports = Student;
