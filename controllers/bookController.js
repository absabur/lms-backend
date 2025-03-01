const createError = require("http-errors");
const Books = require("../models/bookModel");
const { localTime } = require("../utils/localTime.js");
const cloudinary = require("../config/cloudinary.js");
const { makeSlug } = require("../utils/slug.js");

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
      bookNumber,
      category,
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

    const bookNumbersArray = bookNumbers.split(", ").map((item) => item.trim());

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
      bookNumber,
      category,
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
      data: savedBook,
    });
  } catch (error) {
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
      bookNumber,
      category,
      quantity,
      description,
      bookNumbers,
    } = req.body;

    const adminId = req.admin?.id;
    const bookId = req.params.id;

    // Find the book by ID
    const book = await Books.findById(bookId);
    if (!book) {
      throw createError(404, "Book not found");
    }

    let bookNumbersArray = book.bookNumbers
    if (bookNumbers) {
      bookNumbersArray = bookNumbers
        .split(", ")
        .map((item) => item.trim());
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

    // Handle image updates
    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary
      for (const img of book.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }

      // Upload new images
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
    }

    // Update book details
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
    book.category = category || book.category;
    book.quantity = quantity || book.quantity;
    book.description = description || book.description;
    book.bookNumbers = bookNumbersArray || book.bookNumbers;
    book.images = images;
    book.updatedBy = adminId;
    book.updateDate = localTime(0);

    // Save updated book
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

// Get All Books
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
      category,
      minQuantity,
      maxQuantity,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
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
    if (category) filter.category = { $regex: category, $options: "i" };

    // Apply range filters
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

    // Retrieve books with pagination and sorting
    const books = await Books.find(filter)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 });

    if (!books || books.length === 0) {
      throw createError(404, "Books not found");
    }

    const count = await Books.countDocuments(filter);

    res.status(200).json({
      success: true,
      books,
      pagination: {
        totalBooks: count,
        totalPages: Math.ceil(count / Number(limit)),
        currentPage: Number(page),
        prevPage: Number(page) > 1 ? Number(page) - 1 : null,
        nextPage:
          Number(page) < Math.ceil(count / Number(limit))
            ? Number(page) + 1
            : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get Book by ID
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
