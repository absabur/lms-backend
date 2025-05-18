const express = require("express");
const { createBook, updateBook, getAllBooks, getBookBySlug } = require("../controllers/bookController");
const { isAdmin } = require("../middleware/authentication.js");
const upload = require("../utils/multer.js");

const bookRouter = express.Router();

bookRouter.post("/add-book", isAdmin, upload.array('images', 10), createBook);
bookRouter.post("/update-book/:id([0-9a-fA-F]{24})", isAdmin, upload.array('images', 10), updateBook);
bookRouter.get("/all-books", getAllBooks);
bookRouter.get("/get-book/:slug", getBookBySlug);


module.exports = bookRouter;