const mongoose = require("mongoose")
require("dotenv").config();
const mongo_url = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(mongo_url)
        console.log("mongodb is connected.")
        mongoose.connection.on('error', (error) => {
            console.log(`db can not connect for ${error}`)
        })
    } catch (error) {
        console.log(`db can not connect for ${error.message}`)
    }
}

module.exports = connectDB;