const Student = require("../model/Academic/Student");


// ** 
const isStudent = async (req, res, next)=> {
    const userId = req?.userAuth?._id // get the person that is logged in by it id.
    const studentFound = await Student.findById(userId)

    if(studentFound?.role === 'student'){
        next()
    } else{
        next(new Error('Access Denied, Student only 🔐'))
    }
};

module.exports = isStudent;