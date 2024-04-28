const Admin = require("../model/Staff/Admin");
// ** 
const isAdmin = async (req, res, next)=> {
    // ** Find user
    const userId = req.userAuth._id // get the person that is logged in by it id.
    const adminFound = await Admin.findById(userId) // find the person data, using Admin model.

    // check if admin
    if(adminFound?.role === 'admin'){
        next()
    } else{
        next(new Error('Access Denied, admin only 🔐'))
    }
};

module.exports = isAdmin;