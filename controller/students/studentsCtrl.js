const AsyncHandler = require("express-async-handler");
const Student = require("../../model/Academic/Student");
const { hashPassword } = require("../../utils/helpers");




// @desc Admin Register Student
// @route POST /api/v1/students/admin/register
// @access Private Admin only

exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    const student = await Student.findOne({email});
    if(student){
        throw new Error('Student already exists');
    }

    // Hash password 
    const hashedPassword = await hashPassword(password);

    const studentRegistered = await Student.create({
        name,
        email,
        password : hashedPassword
    });

    res.status(201).json({
        status:"Success",
        message: "Student registered successfully",
        data: studentRegistered
    });
});
