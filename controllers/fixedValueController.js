const createHttpError = require("http-errors");
const {
  Country,
  Language,
  Shelf,
  Department,
  Technology,
  Category,
  Session,
  Shift,
  District,
  Upazila,
  Post,
} = require("../models/fixedValueModel.js");
const { localTime } = require("../utils/localTime.js");

exports.createCountry = async (req, res, next) => {
  try {
    const adminId = req.admin.id;
    const { name } = req.body;
    const newCountry = new Country({
      name,
      createdBy: adminId,
      createdDate: localTime(0),
    });
    await newCountry.save();
    res
      .status(201)
      .json({ message: "Country created successfully", country: newCountry });
  } catch (error) {
    next(error);
  }
};

exports.getAllCountries = async (req, res, next) => {
  try {
    const countries = await Country.find();
    res.status(200).json({ countries });
  } catch (error) {
    next(error);
  }
};

exports.createLanguage = async (req, res, next) => {
  try {
    const adminId = req.admin.id;
    const { name } = req.body;
    const newLanguage = new Language({
      name,
      createdBy: adminId,
      createdDate: localTime(0),
    });
    await newLanguage.save();
    res
      .status(201)
      .json({
        message: "Language created successfully",
        language: newLanguage,
      });
  } catch (error) {
    next(error);
  }
};

exports.getAllLanguages = async (req, res, next) => {
  try {
    const languages = await Language.find();
    res.status(200).json({ languages });
  } catch (error) {
    next(error);
  }
};

exports.createShelf = async (req, res, next) => {
  try {
    const adminId = req.admin.id;
    const { name } = req.body;
    const newShelf = new Shelf({
      name,
      createdBy: adminId,
      createdDate: localTime(0),
    });
    await newShelf.save();
    res
      .status(201)
      .json({ message: "Shelf created successfully", shelf: newShelf });
  } catch (error) {
    next(error);
  }
};

exports.getAllShelves = async (req, res, next) => {
  try {
    const shelves = await Shelf.find();
    res.status(200).json({ shelves });
  } catch (error) {
    next(error);
  }
};

exports.createDepartment = async (req, res, next) => {
  try {
    const adminId = req.admin.id;
    const { name } = req.body;
    const newDepartment = new Department({
      name,
      createdBy: adminId,
      createdDate: localTime(0),
    });
    await newDepartment.save();
    res
      .status(201)
      .json({
        message: "Department created successfully",
        department: newDepartment,
      });
  } catch (error) {
    next(error);
  }
};

exports.getAllDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ departments });
  } catch (error) {
    next(error);
  }
};

exports.createTechnology = async (req, res, next) => {
  try {
    const adminId = req.admin.id;
    const { name } = req.body;
    const newTechnology = new Technology({
      name,
      createdBy: adminId,
      createdDate: localTime(0),
    });
    await newTechnology.save();
    res
      .status(201)
      .json({
        message: "Technology created successfully",
        technology: newTechnology,
      });
  } catch (error) {
    next(error);
  }
};

exports.getAllTechnologies = async (req, res, next) => {
  try {
    const technologies = await Technology.find();
    res.status(200).json({ technologies });
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const adminId = req.admin.id;
    const { name } = req.body;
    const newCategory = new Category({
      name,
      createdBy: adminId,
      createdDate: localTime(0),
    });
    await newCategory.save();
    res
      .status(201)
      .json({
        message: "Category created successfully",
        category: newCategory,
      });
  } catch (error) {
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};

exports.createSession = async (req, res, next) => {
  try {
    const adminId = req.admin.id;
    const { name } = req.body;
    const newSession = new Session({
      name,
      createdBy: adminId,
      createdDate: localTime(0),
    });
    await newSession.save();
    res
      .status(201)
      .json({ message: "Session created successfully", session: newSession });
  } catch (error) {
    next(error);
  }
};

exports.getAllSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find();
    res.status(200).json({ sessions });
  } catch (error) {
    next(error);
  }
};

exports.createShift = async (req, res, next) => {
  try {
    const adminId = req.admin.id;
    const { name } = req.body;
    const newShift = new Shift({
      name,
      createdBy: adminId,
      createdDate: localTime(0),
    });
    await newShift.save();
    res
      .status(201)
      .json({ message: "Shift created successfully", shift: newShift });
  } catch (error) {
    next(error);
  }
};

exports.getAllShifts = async (req, res, next) => {
  try {
    const shifts = await Shift.find();
    res.status(200).json({ shifts });
  } catch (error) {
    next(error);
  }
};

exports.createDistrict = async (req, res, next) => {
  try {
    const adminId = req.admin.id;
    const { name } = req.body;
    const newDistrict = new District({
      name,
      createdBy: adminId,
      createdDate: localTime(0),
    });
    await newDistrict.save();
    res
      .status(201)
      .json({
        message: "District created successfully",
        district: newDistrict,
      });
  } catch (error) {
    next(error);
  }
};

exports.getAllDistricts = async (req, res, next) => {
  try {
    const districts = await District.find();
    res.status(200).json({ districts });
  } catch (error) {
    next(error);
  }
};

exports.createUpazila = async (req, res, next) => {
  try {
    const adminId = req.admin.id;
    const { name, districtId } = req.body;
    const district = await District.findById(districtId);
    if (!district) {
      throw createHttpError(404, "District not found")
    }
    const newUpazila = new Upazila({
      name,
      districtId,
      createdBy: adminId,
      createdDate: localTime(0),
    });
    await newUpazila.save();
    res
      .status(201)
      .json({ message: "Upazila created successfully", upazila: newUpazila });
  } catch (error) {
    next(error);
  }
};

exports.getAllUpazilas = async (req, res, next) => {
  try {
    const upazilas = await Upazila.find();
    res.status(200).json({ upazilas });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const adminId = req.admin.id;
    const { name } = req.body;
    const newPost = new Post({
      name,
      createdBy: adminId,
      createdDate: localTime(0),
    });
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    next(error);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};
