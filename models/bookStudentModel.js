const { Schema, model } = require("mongoose");

const BookStudentSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Books",
    required: true,
  },
  bookNumber: {
    type: String,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  takingApproveBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    default: null
  },
  returnApproveBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    default: null
  },
  takingRequestDate: {
    type: Object,
    default: null
  },
  takingApproveDate: {
    type: Object,
    default: null
  },
  returnRequestDate: {
    type: Object,
    default: null
  },
  returnApproveDate: {
    type: Object,
    default: null
  }
});

const BookStudent = model("BookStudent", BookStudentSchema);

module.exports = BookStudent;
