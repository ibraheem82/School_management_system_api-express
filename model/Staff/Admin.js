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

// Hash Password
/*
 --The code is placed within a Mongoose schema's pre('save') middleware function. This function is executed before a new document (representing a user or admin in this case) is saved to the database.
 -- Checking for Password Modification:

 --Inside the middleware, the code first checks if the password field of the current document has been modified using this.isModified('password').
 --If the password hasn't been changed (meaning it's likely an existing user logging in), the code exits the function using next() without hashing again. This optimization avoids unnecessary processing.
Salting (if Password Modified):

 --If the password has been modified (indicating a new user or password change), the code proceeds with hashing.

 --It uses the bcrypt.genSalt(12) function to generate a random string called a "salt." This salt is crucial for enhancing password security. It prevents attackers from pre-computing rainbow tables (a technique to crack hashed passwords) because each password is hashed with a unique salt.



*/


// Verify Password
// what ever that is been put on the method will be available on the instance of the admin.
// * definde a method named verifyPassword that will be available on instances (documents) created from this schema.
// takes a single argument named enteredPassword
// * Inside the method, the code uses bcrypt.compare(enteredPassword, this.password) to compare the enteredPassword with the hashed password stored in the current document's password field (this.password).
// bcrypt.compare is a function from the bcrypt library that performs the secure comparison of a plain text password with a hashed password. It returns a Promise that resolves to true if the passwords match and false otherwise.


//model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
