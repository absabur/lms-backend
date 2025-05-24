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
      book: exists,
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
exports.cancelTakingRequestBookStudentByAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;

    const bookStudent = await BookStudent.findOneAndDelete({
      _id: id,
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
    const bookNumber = req.params.bookNumber;
    const admin = req.admin.id;

    const bookStudent = await BookStudent.findByIdAndUpdate(id, {
      takingApproveBy: admin,
      takingApproveDate: localTime(0),
      bookNumber,
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
        returnRequestDate: localTime(0),
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
      {
        _id: id,
        studentId,
        takingApproveBy: { $ne: null },
        returnApproveBy: null,
      },
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
    if (studentId) filter.studentId = studentId;
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

    // Fetch book-student records with filters, sorting, and pagination
    const bookStudents = await BookStudent.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("studentId", "name email") // Populate student details
      .populate("takingApproveBy", "name email") // Populate admin details for taking approval
      .populate("returnApproveBy", "name email"); // Populate admin details for return approval

    // Count total documents for pagination
    const totalBookStudents = await BookStudent.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: bookStudents.length,
      total: totalBookStudents,
      page: parseInt(page),
      limit: parseInt(limit),
      bookStudents,
    });
  } catch (error) {
    next(error);
  }
};

exports.getStudentBorrowingRequestsByAdmin = async (req, res, next) => {
  try {
    const {
      bookId,
      studentId,
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
    if (studentId) filter.studentId = studentId;
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

    // Fetch book-student records with filters, sorting, and pagination
    const bookStudents = await BookStudent.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate(
        "studentId",
        "name avatar department session shift boardRoll addmissionRoll"
      ) // Populate student details
      .populate("takingApproveBy", "name email") // Populate admin details for taking approval
      .populate("returnApproveBy", "name email"); // Populate admin details for return approval

    // Count total documents for pagination
    const totalBookStudents = await BookStudent.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: bookStudents.length,
      total: totalBookStudents,
      page: parseInt(page),
      limit: parseInt(limit),
      bookStudents,
    });
  } catch (error) {
    next(error);
  }
};
