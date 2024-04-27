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
adminSchema.pre('save', async function (next){
  if(!this.isModified('password')){
    next();
  }
  // salting
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
  next();
})

//model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
