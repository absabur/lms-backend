const { Schema, model } = require("mongoose");


const CountrySchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdDate: {
    type: Object,
  }
});

const Country = model("Country", CountrySchema);


const LanguageSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdDate: {
    type: Object,
  }
});

const Language = model("Language", LanguageSchema);


const ShelfSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdDate: {
    type: Object,
  }
});

const Shelf = model("Shelf", ShelfSchema);


const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter Department"],
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdDate: {
    type: Object,
  }
});

const Department = model("Department", DepartmentSchema);


const TechnologySchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter technology."],
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdDate: {
    type: Object,
  }
});

const Technology = model("Technology", TechnologySchema);


const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter Category"],
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdDate: {
    type: Object,
  }
});

const Category = model("Category", CategorySchema);


const SessionSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter session."],
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdDate: {
    type: Object,
  }
});

const Session = model("Session", SessionSchema);


const ShiftSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter shift."],
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdDate: {
    type: Object,
  }
});

const Shift = model("Shift", ShiftSchema);


const DistrictSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter district."],
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdDate: {
    type: Object,
  }
});

const District = model("District", DistrictSchema);


const UpazilaSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter upazila."],
    trim: true,
  },
  districtId: {
    type: Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdDate: {
    type: Object,
  }
});

const Upazila = model("Upazila", UpazilaSchema);


const PostSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter Post."],
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdDate: {
    type: Object,
  }
});

const Post = model("Post", PostSchema);


module.exports = {
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
};
