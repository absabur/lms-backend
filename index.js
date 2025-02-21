const app = require("./app");
require("dotenv").config();
const connectDB = require("./config/db");

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});


app.listen(process.env.PORT, async () => {
  try {
    await connectDB();
    console.log("Server is running at http://localhost:" + process.env.PORT);
  } catch (error) {
    process.exit(1);
  }
});
