const { Schema, model } = require("mongoose");

const BooksSchema = new Schema({
  bookName: {
    type: String,
    required: [true, "Please Enter Book Name"],
    trim: true,
  },
  bookAuthor: {
    type: String,
    required: [true, "Please Enter Book Author"],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, "Please Enter Book Slug"],
    trim: true,
    unique: true,
  },
  publisher: {
    type: String,
    trim: true,
  },
  edition: {
    type: String,
    trim: true,
  },
  numberOfPages: {
    type: Number,
    min: [0, "Number of Pages cannot be negative"],
  },
  country: {
    type: String,
    trim: true,
  },
  language: {
    type: String,
    trim: true,
  },
  mrp: {
    type: Number,
    required: [true, "Please Enter MRP"],
  },
  shelf: {
    type: String,
    trim: true,
  },
  department: {
    type: String,
    required: [true, "Please Enter department"],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, "Please Enter Quantity"],
    min: [0, "Quantity cannot be negative"],
  },
  bookNumbers: [
    {
      type: String,
      required: true,
    },
  ],
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  description: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createDate: {
    type: Object,
  },
  updateDate: {
    type: Object,
  },
});

const Books = model("Books", BooksSchema);

module.exports = Books;
