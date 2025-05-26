const createError = require("http-errors");
const BookTeacher = require("../models/bookTeacherModel.js");
const { localTime } = require("../utils/localTime.js");
const Books = require("../models/bookModel.js");
const Teacher = require("../models/teacherModel.js");

exports.takingRequestBookTeacher = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const teacherId = req.teacher.id;

    let exists = await Books.findById(bookId);
    if (!exists) {
      throw createError(404, "Book not found");
    }

    const bookTeacher = new BookTeacher({
      book: exists._id,
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
exports.cancelTakingRequestBookTeacherByAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const bookTeacher = await BookTeacher.findOneAndDelete({
      _id: id,
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
    const { bookNumber } = req.params;
    const admin = req.admin.id;

    const bookTeacher = await BookTeacher.findByIdAndUpdate(id, {
      takingApproveBy: admin,
      takingApproveDate: localTime(0),
      bookNumber: bookNumber,
    });

    if (!bookTeacher) {
      throw createError("No borrowing request found");
    }
    const book = await Books.findByIdAndUpdate(
      bookTeacher?.book?._id,
      {
        $inc: { quantity: -1 },
        $pull: { bookNumbers: bookNumber },
      },
      { new: true } // to return the updated document
    );
    res.status(200).json({
      success: true,
      message: "Book borrowing request approved",
    });
  } catch (error) {
    next(error);
  }
};

exports.assignBookDirectlyTeacher = async (req, res, next) => {
  try {
    const bookId = req.params.book;
    const teacherId = req.params.teacher;
    const bookNumber = req.params.bookNumber;
    const admin = req.admin.id;

    if (!bookNumber) {
      throw createError(404, "Book Number Required");
    }

    let exists = await Books.findById(bookId);
    if (!exists) {
      throw createError(404, "Book not found");
    }
    let existsstudent = await Teacher.findById(teacherId);
    if (!existsstudent) {
      throw createError(404, "Teacher not found");
    }

    const bookTeacher = new BookTeacher({
      book: exists._id,
      teacherId,
      takingRequestDate: localTime(0),
      takingApproveBy: admin,
      takingApproveDate: localTime(0),
      bookNumber,
    });

    const book = await Books.findByIdAndUpdate(
      exists?._id,
      {
        $inc: { quantity: -1 },
        $pull: { bookNumbers: bookNumber },
      },
      { new: true }
    );

    await bookTeacher.save();

    res.status(201).json({
      success: true,
      message: "A book successfully assigned",
    });
  } catch (error) {
    next(error);
  }
};
exports.returnBookDirectlyTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = req.admin.id;

    const bookTeacher = await BookTeacher.findOneAndUpdate(
      { _id: id, takingApproveBy: { $ne: null } },
      {
        returnRequestDate: localTime(0),
        returnApproveDate: localTime(0),
        returnApproveBy: admin,
      },
      { new: true }
    );

    if (!bookTeacher) {
      throw createError("No borrowing request found");
    }

    const book = await Books.findByIdAndUpdate(
      bookTeacher?.book,
      {
        $inc: { quantity: 1 },
        $addToSet: { bookNumbers: bookTeacher.bookNumber },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Book return successfull",
    });
  } catch (error) {
    next(error);
  }
};

exports.returnRequestBookTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teacherId = req.teacher.id;

    const bookTeacher = await BookTeacher.findOneAndUpdate(
      { _id: id, teacherId, takingApproveBy: { $ne: null } },
      {
        returnRequestDate: localTime(0),
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
    const { id } = req.params;
    const teacherId = req.teacher.id;

    const bookTeacher = await BookTeacher.findOneAndUpdate(
      {
        _id: id,
        teacherId,
        takingApproveBy: { $ne: null },
        returnApproveBy: null,
      },
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
};

exports.approveReturnRequestBookTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = req.admin.id;
    const bookTeacher = await BookTeacher.findByIdAndUpdate(id, {
      returnApproveBy: admin,
      returnApproveDate: localTime(0),
    });

    if (!bookTeacher) {
      throw createError("No borrowing request found");
    }

    const book = await Books.findByIdAndUpdate(
      bookTeacher?.book,
      {
        $inc: { quantity: 1 },
        $addToSet: { bookNumbers: bookTeacher.bookNumber },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Book return request approved",
    });
  } catch (error) {
    next(error);
  }
};

exports.getTeacherBorrowingRequests = async (req, res, next) => {
  try {
    const teacherId = req.teacher.id;
    const {
      bookId,
      takingApproveBy,
      returnApproveBy,
      takingRequestDate,
      takingApproveDate,
      returnRequestDate,
      returnApproveDate,
      sortBy,
      sortOrder,
      page = 1,
      limit = 10,
    } = req.query;

    // Build the filter object
    const filter = {};

    if (bookId) filter.bookId = bookId;
    if (teacherId) filter.teacherId = teacherId;
    const takingApproveBool =
      takingApproveBy === "true" || takingApproveBy === true;
    const returnApproveBool =
      returnApproveBy === "true" || returnApproveBy === true;
    const takingRequestDateBool =
      takingRequestDate === "true" || takingRequestDate === true;
    const takingApproveDateBool =
      takingApproveDate === "true" || takingApproveDate === true;
    const returnRequestDateBool =
      returnRequestDate === "true" || returnRequestDate === true;
    const returnApproveDateBool =
      returnApproveDate === "true" || returnApproveDate === true;

    // Handle takingApproveBy
    if (takingApproveBool) {
      filter.takingApproveBy = { $ne: null };
    } else if (takingApproveBy === "false" || takingApproveBy === false) {
      filter.takingApproveBy = null;
    }

    // Handle returnApproveBy
    if (returnApproveBool) {
      filter.returnApproveBy = { $ne: null };
    } else if (returnApproveBy === "false" || returnApproveBy === false) {
      filter.returnApproveBy = null;
    }

    if (takingRequestDateBool) {
      filter.takingRequestDate = { $ne: null };
    } else if (takingRequestDate === "false" || takingRequestDate === false) {
      filter.takingRequestDate = null;
    }

    if (takingApproveDateBool) {
      filter.takingApproveDate = { $ne: null };
    } else if (takingApproveDate === "false" || takingApproveDate === false) {
      filter.takingApproveDate = null;
    }
    if (returnRequestDateBool) {
      filter.returnRequestDate = { $ne: null };
    } else if (returnRequestDate === "false" || returnRequestDate === false) {
      filter.returnRequestDate = null;
    }

    if (returnApproveDateBool) {
      filter.returnApproveDate = { $ne: null };
    } else if (returnApproveDate === "false" || returnApproveDate === false) {
      filter.returnApproveDate = null;
    }

    // Build the sort object
    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    // Pagination
    const skip = (page - 1) * limit;

    const bookTeachers = await BookTeacher.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate({
        path: "book",
        select: "images bookName slug bookAuthor department mrp bookNumbers",
        populate: {
          path: "department", // the field inside `book` you want to populate
          select: "name ", // adjust this to the fields you want from department
        },
      });

    // Count total documents for pagination
    const totalBookTeachers = await BookTeacher.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: bookTeachers.length,
      total: totalBookTeachers,
      page: parseInt(page),
      limit: parseInt(limit),
      bookTeachers,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTeacherBorrowingRequestsByAdmin = async (req, res, next) => {
  try {
    const {
      bookId,
      teacherId,
      takingApproveBy,
      returnApproveBy,
      takingRequestDate,
      takingApproveDate,
      returnRequestDate,
      returnApproveDate,
      sortBy,
      sortOrder,
      page = 1,
      limit = 10,
    } = req.query;

    // Build the filter object
    const filter = {};

    if (bookId) filter.bookId = bookId;
    if (teacherId) filter.teacherId = teacherId;
    const takingApproveBool =
      takingApproveBy === "true" || takingApproveBy === true;
    const returnApproveBool =
      returnApproveBy === "true" || returnApproveBy === true;
    const takingRequestDateBool =
      takingRequestDate === "true" || takingRequestDate === true;
    const takingApproveDateBool =
      takingApproveDate === "true" || takingApproveDate === true;
    const returnRequestDateBool =
      returnRequestDate === "true" || returnRequestDate === true;
    const returnApproveDateBool =
      returnApproveDate === "true" || returnApproveDate === true;

    // Handle takingApproveBy
    if (takingApproveBool) {
      filter.takingApproveBy = { $ne: null };
    } else if (takingApproveBy === "false" || takingApproveBy === false) {
      filter.takingApproveBy = null;
    }

    // Handle returnApproveBy
    if (returnApproveBool) {
      filter.returnApproveBy = { $ne: null };
    } else if (returnApproveBy === "false" || returnApproveBy === false) {
      filter.returnApproveBy = null;
    }

    if (takingRequestDateBool) {
      filter.takingRequestDate = { $ne: null };
    } else if (takingRequestDate === "false" || takingRequestDate === false) {
      filter.takingRequestDate = null;
    }

    if (takingApproveDateBool) {
      filter.takingApproveDate = { $ne: null };
    } else if (takingApproveDate === "false" || takingApproveDate === false) {
      filter.takingApproveDate = null;
    }
    if (returnRequestDateBool) {
      filter.returnRequestDate = { $ne: null };
    } else if (returnRequestDate === "false" || returnRequestDate === false) {
      filter.returnRequestDate = null;
    }

    if (returnApproveDateBool) {
      filter.returnApproveDate = { $ne: null };
    } else if (returnApproveDate === "false" || returnApproveDate === false) {
      filter.returnApproveDate = null;
    }

    // Build the sort object
    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Fetch book-teacher records with filters, sorting, and pagination
    const bookTeachers = await BookTeacher.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate({
        path: "book",
        select:
          "images bookName slug bookAuthor department shelf mrp bookNumbers",
        populate: [
          {
            path: "department", // the field inside `book` you want to populate
            select: "name", // adjust this to the fields you want from department
          },
          {
            path: "shelf", // the field inside `book` you want to populate
            select: "name", // adjust this to the fields you want from department
          },
        ],
      })
      .populate({
        path: "teacherId",
        select: "name avatar department post teacherId",
        populate: [
          {
            path: "department",
            select: "name", // adjust based on your schema
          },
          {
            path: "post",
            select: "name", // adjust based on your schema
          },
        ],
      });

    // Count total documents for pagination
    const totalBookTeachers = await BookTeacher.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: bookTeachers.length,
      total: totalBookTeachers,
      page: parseInt(page),
      limit: parseInt(limit),
      bookTeachers,
    });
  } catch (error) {
    next(error);
  }
};
