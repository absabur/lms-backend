const createError = require("http-errors");
const Books = require("../models/bookModel");
const BookStudent = require("../models/bookStudentModel");
const BookTeacher = require("../models/bookTeacherModel");
const { localTime } = require("../utils/localTime.js");
const cloudinary = require("../config/cloudinary.js");
const { makeSlug } = require("../utils/slug.js");
const { Department } = require("../models/fixedValueModel.js");
const { default: mongoose } = require("mongoose");

// Create Book
exports.createBook = async (req, res, next) => {
  try {
    const {
      bookName,
      bookAuthor,
      publisher,
      edition,
      numberOfPages,
      country,
      language,
      mrp,
      shelf,
      department,
      quantity,
      description,
      bookNumbers,
    } = req.body;

    const adminId = req.admin?.id;

    // Validation
    if (!req.files || req.files.length === 0) {
      throw createError(400, "At least one image is required.");
    }

    let slug = makeSlug(bookName, bookAuthor);
    let exists = await Books.findOne({ slug: slug });

    if (exists) {
      throw createError(404, "This book already exists.");
    }

    const bookNumbersArray = bookNumbers.split(",").map((item) => item.trim());

    if (bookNumbersArray.length != quantity) {
      throw createError(400, "Book numbers should be equal to quantity.");
    }

    // Prepare images for cloud upload
    const images = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "books",
      });
      images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    // Create and save the book
    const book = new Books({
      bookName,
      bookAuthor,
      slug,
      publisher,
      edition,
      numberOfPages,
      country,
      language,
      mrp,
      shelf,
      department,
      total: quantity,
      quantity,
      images,
      description,
      bookNumbers: bookNumbersArray,
      createdBy: adminId,
      updatedBy: adminId,
      createDate: localTime(0),
      updateDate: localTime(0),
    });

    const savedBook = await book.save();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Update Book
exports.updateBook = async (req, res, next) => {
  try {
    const {
      bookName,
      bookAuthor,
      publisher,
      edition,
      numberOfPages,
      country,
      language,
      mrp,
      shelf,
      department,
      quantity,
      description,
      bookNumbers,
    } = req.body;

    const adminId = req.admin?.id;
    const bookId = req.params.id;

    const book = await Books.findById(bookId);
    if (!book) {
      throw createError(404, "Book not found");
    }

    let bookNumbersArray = book.bookNumbers;
    if (bookNumbers) {
      bookNumbersArray = bookNumbers.split(",").map((item) => item.trim());
      
      if (quantity) {
        if (bookNumbersArray.length != quantity) {
          throw createError(400, "Book numbers should be equal to quantity.");
        }
      } else {
        if (bookNumbersArray.length != book.quantity) {
          throw createError(400, "Book numbers should be equal to quantity.");
        }
      }
    }

    let images = book.images;
    if (req.files && req.files.length > 0) {
      images = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "books",
        });
        images.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      for (const img of book.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // Update fields
    const updatedName = bookName || book.bookName;
    const updatedAuthor = bookAuthor || book.bookAuthor;

    // Update slug if bookName or bookAuthor changed
    if (bookName || bookAuthor) {
      const newSlug = makeSlug(updatedName, updatedAuthor);

      // Only update if slug is different
      if (newSlug !== book.slug) {
        const slugExists = await Books.findOne({ slug: newSlug });
        if (slugExists && slugExists._id.toString() !== book._id.toString()) {
          throw createError(
            400,
            "Another book with the same name and author already exists."
          );
        }
        book.slug = newSlug;
      }
    }

    // Set remaining fields
    book.bookName = updatedName;
    book.bookAuthor = updatedAuthor;
    book.publisher = publisher || book.publisher;
    book.edition = edition || book.edition;
    book.numberOfPages = numberOfPages || book.numberOfPages;
    book.country = country || book.country;
    book.language = language || book.language;
    book.mrp = mrp || book.mrp;
    book.shelf = shelf || book.shelf;
    book.department = department || book.department;
    book.total = book.total;
    book.quantity = quantity || book.quantity;
    book.description = description || book.description;
    book.bookNumbers = bookNumbersArray || book.bookNumbers;
    book.images = images;
    book.updatedBy = adminId;
    book.updateDate = localTime(0);

    const updatedBook = await book.save();

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get All Books
exports.getAllBooks = async (req, res, next) => {
  try {
    const {
      bookName,
      bookAuthor,
      publisher,
      edition,
      language,
      department,
      shelf,
      country,
      mrpMin,
      mrpMax,
      quantityMin,
      quantityMax,
      sortBy,
      sortOrder,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    // Build the filter object
    const filter = {};

    let departmentId = "";
    const isObjectId = mongoose.Types.ObjectId.isValid(department);
    if (department && !isObjectId) {
      const departmentDoc = await Department.findOne({ name: department });
      if (!departmentDoc) {
        throw createError(400, "Department Not Found");
      }
      departmentId = departmentDoc._id;
    }

    if (bookName) filter.bookName = { $regex: bookName, $options: "i" };
    if (bookAuthor) filter.bookAuthor = { $regex: bookAuthor, $options: "i" };
    if (publisher) filter.publisher = { $regex: publisher, $options: "i" };
    if (edition) filter.edition = { $regex: edition, $options: "i" };
    if (language) filter.language = language;
    if (department) filter.department = department;
    if (departmentId) filter.department = departmentId;
    if (shelf) filter.shelf = shelf;
    if (country) filter.country = country;
    if (search) {
      filter.$or = [
        { bookName: { $regex: search, $options: "i" } },
        { bookAuthor: { $regex: search, $options: "i" } },
        { publisher: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by MRP range
    if (mrpMin || mrpMax) {
      filter.mrp = {};
      if (mrpMin) filter.mrp.$gte = parseFloat(mrpMin);
      if (mrpMax) filter.mrp.$lte = parseFloat(mrpMax);
    }

    // Filter by quantity range
    if (quantityMin || quantityMax) {
      filter.quantity = {};
      if (quantityMin) filter.quantity.$gte = parseInt(quantityMin);
      if (quantityMax) filter.quantity.$lte = parseInt(quantityMax);
    }

    // Build the sort object
    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Fetch books with filters, sorting, and pagination
    const books = await Books.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("country", "name")
      .populate("language", "name")
      .populate("shelf", "name")
      .populate("department", "name");

    // Count total documents for pagination
    const totalBooks = await Books.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: books.length,
      total: totalBooks,
      page: parseInt(page),
      limit: parseInt(limit),
      books,
    });
  } catch (error) {
    next(error);
  }
};

// Get Book by ID
exports.getBookBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    const book = await Books.find({ slug: slug })
      .populate("country", "name")
      .populate("language", "name")
      .populate("shelf", "name")
      .populate("department", "name");

    if (!book) {
      throw createError(404, "Book not found");
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
};
exports.mostBorrowBook = async (req, res, next) => {
  try {
    const mostReadByStudent = await BookStudent.aggregate([
      { $group: { _id: "$book", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "books", // Make sure this matches your actual collection name
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
    ]);
    const mostReadByTeacher = await BookTeacher.aggregate([
      { $group: { _id: "$book", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "books", // Make sure this matches your actual collection name
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
    ]);

    res.status(200).json({
      success: true,
      mostReadByStudent,
      mostReadByTeacher,
    });
  } catch (error) {
    next(error);
  }
};
