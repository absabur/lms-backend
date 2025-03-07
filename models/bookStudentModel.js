const { Schema, model } = require("mongoose");

const BookStudentSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Books",
    required: true,
  },
  bookNumber: {
    type: Number,
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
  },
  takingApproveDate: {
    type: Object,
  },
  returnRequestDate: {
    type: Object,
  },
  returnApproveDate: {
    type: Object,
  }
});

const BookStudent = model("BookStudent", BookStudentSchema);

module.exports = BookStudent;
