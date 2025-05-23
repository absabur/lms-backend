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
      book: exists,
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

    res.status(200).json({
      success: true,
      message: "Book borrowing request approved",
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
      bookNumber,
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
    if (bookNumber) filter.bookNumber = bookNumber;
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
      .populate("teacherId", "name email") // Populate teacher details
      .populate("takingApproveBy", "name email") // Populate admin details for taking approval
      .populate("returnApproveBy", "name email"); // Populate admin details for return approval

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
      bookNumber,
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
    if (bookNumber) filter.bookNumber = bookNumber;
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
      .populate("teacherId", "name avatar department post teacherId")
      .populate("takingApproveBy", "name email")
      .populate("returnApproveBy", "name email");

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
