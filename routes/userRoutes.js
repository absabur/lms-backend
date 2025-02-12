const express = require("express");
const { getUsers } = require("../controllers/userController");

const router = express.Router();

router.get("/users", getUsers); // Define the route

module.exports = router;
