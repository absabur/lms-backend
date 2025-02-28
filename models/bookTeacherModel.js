const { Schema, model } = require("mongoose");

const BookTeacherSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Books",
    required: true,
  },
  bookNumber: {
    type: Number,
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
  },
  TakingApproveDate: {
    type: Object,
  },
  returnRequestDate: {
    type: Object,
  },
  returnApproveDate: {
    type: Object,
  }
});

const BookTeacher = model("BookTeacher", BookTeacherSchema);

module.exports = BookTeacher;
