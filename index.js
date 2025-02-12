const app = require("./app");
require("dotenv").config();
const prisma = require("./config/prismaClient"); // Import Prisma Client

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

app.listen(process.env.PORT, async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
    console.log("Server is running at http://localhost:" + process.env.PORT);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
});
