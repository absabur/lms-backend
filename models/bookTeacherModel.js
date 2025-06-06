const { Schema, model } = require("mongoose");

const BookTeacherSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Books",
    required: true,
  },
  bookNumber: {
    type: String,
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
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

const BookTeacher = model("BookTeacher", BookTeacherSchema);

module.exports = BookTeacher;
