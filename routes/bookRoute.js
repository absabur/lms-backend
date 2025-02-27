const express = require("express");
const { createBook, updateBook, getAllBooks } = require("../controllers/bookController");
const { isAdmin } = require("../middleware/authentication.js");
const upload = require("../utils/multer.js");

const bookRouter = express.Router();

bookRouter.post( "/add-book", isAdmin, upload.array('images', 10), createBook);

bookRouter.post( "/update-book/:id([0-9a-fA-F]{24})", isAdmin, upload.array('images', 10), updateBook);

bookRouter.get( "/all-books", isAdmin, getAllBooks);

module.exports = bookRouter;