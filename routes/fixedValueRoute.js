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
const { isSuperAdmin } = require("../middleware/authentication.js")


fixedValueRouter.post("/countries", isSuperAdmin, createCountry);
fixedValueRouter.get("/countries", getAllCountries);


fixedValueRouter.post("/languages", isSuperAdmin, createLanguage);
fixedValueRouter.get("/languages", getAllLanguages);


fixedValueRouter.post("/shelves", isSuperAdmin, createShelf);
fixedValueRouter.get("/shelves", getAllShelves);


fixedValueRouter.post("/departments", isSuperAdmin, createDepartment);
fixedValueRouter.get("/departments", getAllDepartments);


fixedValueRouter.post("/sessions", isSuperAdmin, createSession);
fixedValueRouter.get("/sessions", getAllSessions);


fixedValueRouter.post("/shifts", isSuperAdmin, createShift);
fixedValueRouter.get("/shifts", getAllShifts);


fixedValueRouter.post("/districts", createDistrict);
fixedValueRouter.get("/districts", getAllDistricts);


fixedValueRouter.post("/upazilas", createUpazila);
fixedValueRouter.get("/upazilas", getAllUpazilas);


fixedValueRouter.post("/posts", isSuperAdmin, createPost);
fixedValueRouter.get("/posts", getAllPosts);

fixedValueRouter.get("/all-values", allValues);



module.exports = fixedValueRouter;
