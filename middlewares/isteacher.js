const Teacher = require("../model/Staff/Teacher");
// ** 
const isTeacher = async (req, res, next)=> {
    const userId = req?.userAuth?._id // get the person that is logged in by it id.
    const teacherFound = await Teacher.findById(userId) // find the person data, using Teacher model.

    if(teacherFound?.role === 'teacher'){
        next()
    } else{
        next(new Error('Access Denied, teachers only 🔐'))
    }
};

module.exports = isTeacher;