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
  getAllPosts
} = require("../controllers/fixedValueController.js");
const { isSuperAdmin } = require("../middleware/authentication.js")


fixedValueRouter.post("/country", isSuperAdmin, createCountry);
fixedValueRouter.get("/countries", getAllCountries);


fixedValueRouter.post("/language", isSuperAdmin, createLanguage);
fixedValueRouter.get("/languages", getAllLanguages);


fixedValueRouter.post("/shelf", isSuperAdmin, createShelf);
fixedValueRouter.get("/shelves", getAllShelves);


fixedValueRouter.post("/department", isSuperAdmin, createDepartment);
fixedValueRouter.get("/departments", getAllDepartments);


fixedValueRouter.post("/session", isSuperAdmin, createSession);
fixedValueRouter.get("/sessions", getAllSessions);


fixedValueRouter.post("/shift", isSuperAdmin, createShift);
fixedValueRouter.get("/shifts", getAllShifts);


fixedValueRouter.post("/district", createDistrict);
fixedValueRouter.get("/districts", getAllDistricts);


fixedValueRouter.post("/upazila", createUpazila);
fixedValueRouter.get("/upazilas", getAllUpazilas);


fixedValueRouter.post("/post", isSuperAdmin, createPost);
fixedValueRouter.get("/posts", getAllPosts);

module.exports = fixedValueRouter;
