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
  createTechnology,
  getAllTechnologies,
  createCategory,
  getAllCategories,
  createSession,
  getAllSessions,
  createShift,
  getAllShifts,
  createDistrict,
  getAllDistricts,
  createUpazila,
  getAllUpazilas,
  createPost,
  getAllPosts
} = require("../controllers/fixedValueController.js");
const { isAdmin } = require("../middleware/authentication.js")


fixedValueRouter.post("/country", isAdmin, createCountry);
fixedValueRouter.get("/countries", getAllCountries);


fixedValueRouter.post("/language", isAdmin, createLanguage);
fixedValueRouter.get("/languages", getAllLanguages);


fixedValueRouter.post("/shelf", isAdmin, createShelf);
fixedValueRouter.get("/shelves", getAllShelves);


fixedValueRouter.post("/department", isAdmin, createDepartment);
fixedValueRouter.get("/departments", getAllDepartments);


fixedValueRouter.post("/technology", isAdmin, createTechnology);
fixedValueRouter.get("/technologies", getAllTechnologies);


fixedValueRouter.post("/category", isAdmin, createCategory);
fixedValueRouter.get("/categories", getAllCategories);


fixedValueRouter.post("/session", isAdmin, createSession);
fixedValueRouter.get("/sessions", getAllSessions);


fixedValueRouter.post("/shift", isAdmin, createShift);
fixedValueRouter.get("/shifts", getAllShifts);


fixedValueRouter.post("/district", isAdmin, createDistrict);
fixedValueRouter.get("/districts", getAllDistricts);


fixedValueRouter.post("/upazila", isAdmin, createUpazila);
fixedValueRouter.get("/upazilas", getAllUpazilas);


fixedValueRouter.post("/post", isAdmin, createPost);
fixedValueRouter.get("/posts", getAllPosts);

module.exports = fixedValueRouter;
