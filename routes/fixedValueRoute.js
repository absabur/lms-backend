const express = require("express");
const fixedValueRouter = express.Router();
const {
  createCountry,
  getAllCountries,
  createLanguage,
  getAllLanguages,
  createShelf,
  getAllShelves,
  createDepartment,
  getAllDepartments,
  createSession,
  getAllSessions,
  createShift,
  getAllShifts,
  createDistrict,
  getAllDistricts,
  createUpazila,
  getAllUpazilas,
  createPost,
  getAllPosts,
  allValues
} = require("../controllers/fixedValueController.js");
const { isAdmin } = require("../middleware/authentication.js")


fixedValueRouter.post("/countries", isAdmin, createCountry);
fixedValueRouter.get("/countries", getAllCountries);


fixedValueRouter.post("/languages", isAdmin, createLanguage);
fixedValueRouter.get("/languages", getAllLanguages);


fixedValueRouter.post("/shelves", isAdmin, createShelf);
fixedValueRouter.get("/shelves", getAllShelves);


fixedValueRouter.post("/departments", isAdmin, createDepartment);
fixedValueRouter.get("/departments", getAllDepartments);


fixedValueRouter.post("/sessions", isAdmin, createSession);
fixedValueRouter.get("/sessions", getAllSessions);


fixedValueRouter.post("/shifts", isAdmin, createShift);
fixedValueRouter.get("/shifts", getAllShifts);


fixedValueRouter.post("/districts", createDistrict);
fixedValueRouter.get("/districts", getAllDistricts);


fixedValueRouter.post("/upazilas", createUpazila);
fixedValueRouter.get("/upazilas", getAllUpazilas);


fixedValueRouter.post("/posts", isAdmin, createPost);
fixedValueRouter.get("/posts", getAllPosts);

fixedValueRouter.get("/all-values", allValues);



module.exports = fixedValueRouter;
