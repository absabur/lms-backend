const createError = require("http-errors");
const BookTeacher = require("../models/bookTeacherModel.js");
const { localTime } = require("../utils/localTime.js");
const Books = require("../models/bookModel.js");

exports.takingRequestBookTeacher = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const teacherId = req.teacher.id;

    let exists = await Books.findById(bookId);
    if (!exists) {
      throw createError(404, "Book not found");
    }

    const bookTeacher = new BookTeacher({
      bookId,
      teacherId,
      takingRequestDate: localTime(0),
    });

    await bookTeacher.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed request successfull",
    });
  } catch (error) {
    next(error);
  }
};

exports.cancelTakingRequestBookTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teacherId = req.teacher.id;

    const bookTeacher = await BookTeacher.findOneAndDelete({
      _id: id,
      teacherId,
      takingApproveBy: null,
    });

    if (!bookTeacher) {
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

exports.approveTakingRequestBookTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;
        const admin = req.admin.id;

        const bookTeacher = await BookTeacher
        .findByIdAndUpdate(id, {
            takingApproveBy: admin,
            takingApproveDate: localTime(0),
        });
        
        if (!bookTeacher) {
            throw createError("No borrowing request found");
        }
        
        res.status(200).json({
            success: true,
            message: "Book borrowing request approved",
        });

    } catch (error) {
        next(error);
    }
}


exports.returnRequestBookTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;
        const teacherId = req.teacher.id

        const bookTeacher = await BookTeacher.findOneAndUpdate(
            { _id: id, teacherId, takingApproveBy: { $ne: null } },
            {
               returnRequestDate: localTime(0)
            },
            { new: true }
        );

        if (!bookTeacher) {
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


exports.cancelReturnRequestBookTeacher = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const teacherId = req.teacher.id;

    const bookTeacher = await BookTeacher.findOneAndUpdate(
      { _id: id, teacherId, returnApproveBy: null },
      { returnRequestDate: null }
    );

    if (!bookTeacher) {
      throw createError("No borrowing request found");
    }

    res.status(200).json({
      success: true,
      message: "Book return request cancelled",
    });
  } catch (error) {
    next(error);
  }
}


exports.approveReturnRequestBookTeacher = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        const admin = req.admin.id;
        const bookTeacher = await BookTeacher
        .findByIdAndUpdate(id, {
            returnApproveBy: admin,
            returnApproveDate: localTime(0),
        });
        
        if (!bookTeacher) {
            throw createError("No borrowing request found");
        }
        
        res.status(200).json({
            success: true,
            message: "Book return request approved",
        });
        
    } catch (error) {
        next(error);
    }
}



exports.getTeacherBorrowingRequests = async (req, res, next) => {
  try {
    const teacherId = req.teacher.id;
    const bookTeachers = await BookTeacher.find({ teacherId });
    res.status(200).json({
      success: true,
      borrowingDatas: bookTeachers,
    });
    } catch (error) {
    next(error);
  }
}


exports.getTeacherBorrowingRequestsByAdmin = async (req, res, next) => {
  try {
    const bookTeachers = await BookTeacher.find();
    
    res.status(200).json({
      success: true,
      borrowingRequests: bookTeachers,
    });
  } catch (error) {
    next(error);
  }
}