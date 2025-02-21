const createError = require("http-errors");
const Books = require("../models/bookModel");

exports.createBook = async (req, res, next) => {
  try {
    let bookData = {
        name: req.body.bookName,
    }
    
    const book = await Books.create(bookData);
    if (!book) {
      throw createError(404, "unable to post book");
    }
    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    next(error);
  }
};

