const createError = require("http-errors");
const BookTeacher = require("../models/bookTeacherModel.js");
const { localTime } = require("../utils/localTime.js");

exports.takingRequestBookTeacher = async (req, res, next) => {
  try {
    const { bookId } = req.params.id;
    const teacherId = req.teacher.id;

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
    const { id } = req.params.id;
    const teacherId = req.teacher.id;
    const bookTeacher = await BookTeacher.findOneAndDelete({
      id,
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
        const { id } = req.params.id;
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
            { id, teacherId, takingApproveBy: { $ne: null } },
            {
                $set: { returnRequestDate: localTime(0) }
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
      { id, teacherId, returnApproveBy: null },
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