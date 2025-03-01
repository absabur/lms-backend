const createError = require("http-errors");
const BookStudent = require("../models/bookStudentModel.js");
const Books = require("../models/bookModel.js");
const { localTime } = require("../utils/localTime.js");

exports.takingRequestBookStudent = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const studentId = req.student.id;

    let exists = await Books.findById(bookId);
    if (!exists) {
      throw createError(404, "Book not found");
    }

    const bookStudent = new BookStudent({
      bookId,
      studentId,
      takingRequestDate: localTime(0),
    });

    await bookStudent.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed request successfull",
    });
  } catch (error) {
    next(error);
  }
};

exports.cancelTakingRequestBookStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const studentId = req.student.id;

    const bookStudent = await BookStudent.findOneAndDelete({
      _id: id,
      studentId,
      takingApproveBy: null,
    });

    if (!bookStudent) {
      throw createError("No borrowing request found");
    }

    res.status(200).json({
      success: true,
      message: "Book borrowing request cancelled",
    });
  } catch (error) {
    next(error);
  }
};

exports.approveTakingRequestBookStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const admin = req.admin.id;

    const bookStudent = await BookStudent.findByIdAndUpdate(id, {
      takingApproveBy: admin,
      takingApproveDate: localTime(0),
    });

    if (!bookStudent) {
      throw createError("No borrowing request found");
    }

    res.status(200).json({
      success: true,
      message: "Book borrowing request approved",
    });
  } catch (error) {
    next(error);
  }
};

exports.returnRequestBookStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const studentId = req.student.id;

    const bookStudent = await BookStudent.findOneAndUpdate(
      { _id: id, studentId, takingApproveBy: { $ne: null } },
      {
         returnRequestDate: localTime(0)
      },
      { new: true }
    );

    if (!bookStudent) {
      throw createError("No borrowing request found");
    }

    res.status(200).json({
      success: true,
      message: "Book return request successful",
    });
  } catch (error) {
    next(error);
  }
};

exports.cancelReturnRequestBookStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const studentId = req.student.id;
    
    const bookStudent = await BookStudent.findOneAndUpdate(
      { _id: id, studentId, returnApproveBy: null },
      { returnRequestDate: null }
    );

    if (!bookStudent) {
      throw createError("No borrowing request found");
    }

    res.status(200).json({
      success: true,
      message: "Book return request cancelled",
    });
  } catch (error) {
    next(error);
  }
};

exports.approveReturnRequestBookStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = req.admin.id;

    const bookStudent = await BookStudent.findByIdAndUpdate(id, {
      returnApproveBy: admin,
      returnApproveDate: localTime(0),
    });

    if (!bookStudent) {
      throw createError("No borrowing request found");
    }

    res.status(200).json({
      success: true,
      message: "Book return request approved",
    });
  } catch (error) {
    next(error);
  }
};


exports.getStudentBorrowingRequests = async (req, res, next) => {
  try {
    const studentId = req.student.id;
    const bookStudents = await BookStudent.find({ studentId });
    res.status(200).json({
      success: true,
      borrowingDatas: bookStudents,
    });
    } catch (error) {
    next(error);
  }
}

exports.getStudentBorrowingRequestsByAdmin = async (req, res, next) => {
  try {
    const bookStudents = await BookStudent.find();
    
    res.status(200).json({
      success: true,
      borrowingRequests: bookStudents,
    });
  } catch (error) {
    next(error);
  }
}
