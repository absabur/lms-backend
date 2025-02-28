const createError = require("http-errors");
const Books = require("../models/bookModel");
const { localTime } = require("../utils/localTime.js");
const cloudinary = require("../config/cloudinary.js");

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
      bookNumber,
      department,
      quantity,
      description,
      bookNumbers,
    } = req.body;

    const adminId = req.admin?.id;

    if (!req.files || req.files.length === 0) {
      throw createError(400, "At least one image is required.");
    }

    if (bookNumbers.length != qunatity) {
      throw createError(400, "Book numbers should be equal to quantity.");
    }

    const images = [];

    // Upload all images to Cloudinary
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, { folder: "books" });

      images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const book = new Books({
      bookName,
      bookAuthor,
      publisher,
      edition,
      numberOfPages,
      country,
      language,
      mrp,
      shelf,
      bookNumber,
      department,
      quantity,
      images,
      description,
      bookNumbers,
      createdBy: adminId,
      updatedBy: adminId,
      createDate: localTime(0),
      updateDate: localTime(0),
    });

    const savedBook = await book.save();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: savedBook,
    });

  } catch (error) {
    next(error);
  }
};



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
      bookNumber,
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

    let images = book.images;

    if (req.files && req.files.length > 0) {
      for (const img of book.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }

      images = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: "books" });
        images.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    book.bookName = bookName || book.bookName;
    book.bookAuthor = bookAuthor || book.bookAuthor;
    book.publisher = publisher || book.publisher;
    book.edition = edition || book.edition;
    book.numberOfPages = numberOfPages || book.numberOfPages;
    book.country = country || book.country;
    book.language = language || book.language;
    book.mrp = mrp || book.mrp;
    book.shelf = shelf || book.shelf;
    book.bookNumber = bookNumber || book.bookNumber;
    book.department = department || book.department;
    book.quantity = quantity || book.quantity;
    book.description = description || book.description;
    book.bookNumbers = bookNumbers || book.bookNumbers;
    book.images = images;
    book.updatedBy = adminId;
    book.updateDate = localTime(0);

    if (book.bookNumbers !== book.quantity) {
      throw createError(400, "Book numbers should be equal to quantity.");
    }

    const updatedBook = await book.save();

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });

  } catch (error) {
    next(error);
  }
};

exports.getAllBooks = async (req, res, next) => {
  try {
    const {
      bookName,
      bookAuthor,
      publisher,
      edition,
      country,
      language,
      minPages,
      maxPages,
      minMRP,
      maxMRP,
      shelf,
      department,
      minQuantity,
      maxQuantity,
      sortBy = "createdAt", // default sort field
      sortOrder = "desc", // default sort order
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};

    // Apply filters
    if (bookName) filter.bookName = { $regex: bookName, $options: "i" };
    if (bookAuthor) filter.bookAuthor = { $regex: bookAuthor, $options: "i" };
    if (publisher) filter.publisher = { $regex: publisher, $options: "i" };
    if (edition) filter.edition = { $regex: edition, $options: "i" };
    if (country) filter.country = { $regex: country, $options: "i" };
    if (language) filter.language = { $regex: language, $options: "i" };
    if (shelf) filter.shelf = { $regex: shelf, $options: "i" };
    if (department) filter.department = { $regex: department, $options: "i" };

    // Page range filters
    if (minPages || maxPages) {
      filter.numberOfPages = {};
      if (minPages) filter.numberOfPages.$gte = parseInt(minPages);
      if (maxPages) filter.numberOfPages.$lte = parseInt(maxPages);
    }

    if (minMRP || maxMRP) {
      filter.mrp = {};
      if (minMRP) filter.mrp.$gte = parseFloat(minMRP);
      if (maxMRP) filter.mrp.$lte = parseFloat(maxMRP);
    }

    if (minQuantity || maxQuantity) {
      filter.quantity = {};
      if (minQuantity) filter.quantity.$gte = parseInt(minQuantity);
      if (maxQuantity) filter.quantity.$lte = parseInt(maxQuantity);
    }

    // Fetch books with filter, pagination, and sorting
    const books = await Books.find(filter)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 });

    if (!books || books.length === 0) {
      throw createError(404, "Books not found");
    }

    // Get total count of documents for pagination
    const count = await Books.countDocuments(filter);

    // Respond with paginated results
    res.status(200).json({
      success: true,
      books,
      pagination: {
        totalBooks: count,
        totalPages: Math.ceil(count / Number(limit)),
        currentPage: Number(page),
        prevPage: Number(page) > 1 ? Number(page) - 1 : null,
        nextPage: Number(page) < Math.ceil(count / Number(limit)) ? Number(page) + 1 : null,
      },
    });
  } catch (error) {
    next(error);
  }
};


exports.getBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id;

    const book = await Books.findById(bookId);
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