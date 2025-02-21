const { Schema, model } = require("mongoose")

const BooksSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter Books Name"],
        trim: true,
    },
}, {timestamps: true})

const Books = model('Books', BooksSchema)

module.exports = Books;