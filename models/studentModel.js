const { Schema, model } = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter Your name."],
        trim: true,
        minlength: [3, 'Student Name must be atleast 3 charecter.'],
        maxlength: [30, 'Student Name allowed max 30 charecter.'],
    },    
    email: {
        type: String,
        required: [true, "Please enter email."],
        trim: true,
        unique: [true, "email already in student"],
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    phone: {
        type: String,
        required: [true, "Please enter phone."],
        trim: true,
        unique: [true, "phone already in student"],
        minlength: [11, 'Phone number must be atleast 11 charecter.'],
    },
    roll: {
        type: Number,
        required: [true, "Please enter roll."],
        unique: [true, "roll already in student"],
    },
    registration: {
        type: Number,
        required: [true, "Please enter registration."],
        unique: [true, "registration already in student"],
    },
    department: {
        type: String,
        required: [true, "Please enter department."],
        trim: true,
    },
    session: {
        type: String,
        required: [true, "Please enter session."],
        trim: true,
    },
    shift: {
        type: String,
        required: [true, "Please enter shift."],
        trim: true,
    },
    group: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [6, "Password should be greater than 6 characters"],
        select: false,
      },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    isBan: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
    },
    createDate: {
        type: Object,
    },
    updateDate: {
        type: Object,
    }
});

studentSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 10)
});

studentSchema.methods.getJWTToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: Number(process.env.JWT_EXPIRE)*60*1000
    })
}

studentSchema.methods.comparedPassword = async function(pass) {
    return await bcryptjs.compare(pass, this.password)
}



const Student = model('Student', studentSchema);

module.exports = Student;