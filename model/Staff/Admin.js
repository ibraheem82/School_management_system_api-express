const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    academicTerms:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicTerm",
    }],

    academicYears:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
    }],

    classLevels:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassLevel",
    }],

    teachers:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    }],

    students:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    }],
  },
  {
    timestamps: true,
  }
);



// Verify Password
// what ever that is been put on the method will be available on the instance of the admin.
// * definde a method named verifyPassword that will be available on instances (documents) created from this schema.
// takes a single argument named enteredPassword
// * Inside the method, the code uses bcrypt.compare(enteredPassword, this.password) to compare the enteredPassword with the hashed password stored in the current document's password field (this.password).
// bcrypt.compare is a function from the bcrypt library that performs the secure comparison of a plain text password with a hashed password. It returns a Promise that resolves to true if the passwords match and false otherwise.


//model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
