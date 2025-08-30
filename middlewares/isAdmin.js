const Admin = require("../model/Staff/Admin");
// ** 
const isAdmin = async (req, res, next)=> {
    // ** Find user
    /*
     req?.userAuth:

This is a safe navigation expression using the optional chaining operator (?.).
It attempts to access the property userAuth on the req object.
If req is null or undefined, the expression evaluates to undefined instead of throwing an error. This prevents potential runtime errors if the userAuth property is not always present on req.
2. ?._id:

Assuming userAuth is not null or undefined (because of the safe navigation), this part tries to access the property _id within the userAuth object.
Again, the optional chaining operator (?.) is used for safe navigation. If userAuth exists but doesn't have an _id property, the expression evaluates to undefined without an error.
    */
    const userId = req?.userAuth?._id // get the person that is logged in by it id.
    const adminFound = await Admin.findById(userId) // find the person data, using Admin model.

    // check if admin
    if(adminFound?.role === 'admin'){
        next()
    } else{
        next(new Error('Access Denied, admin only 🔐'))
    }
};

module.exports = isAdmin;