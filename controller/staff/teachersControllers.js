const AsyncHandler = require("express-async-handler"); // 
const Admin = require("../../model/Staff/Admin");
const Teacher = require("../../model/Staff/Teacher");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");

// @desc Admin Register Teacher
// @route POST /api/v1/teachers/admin/register
// @access Private

exports.adminRegisterTeacher = AsyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    // check if teacher already exists

    const teacher = await Teacher.findOne({email});
    if(teacher){
        throw new Error('Teacher already employed');
    }

    // Hash password 
    const hashedPassword = await hashPassword(password);

    // create teacher
    const teacherCreated = await Teacher.create({
        name,
        email,
        password : hashedPassword
    });

    res.status(201).json({
        status:"Success",
        message: "Teacher registered successfully",
        data: teacherCreated
    })


});




// @desc Login teacher
// @route POST /api/v1/teachers/login
// @access Private

exports.loginTeacher = AsyncHandler(async (req, res) => {
    const {email, password}  = req.body
    // find user
    const teacher = await Teacher.findOne({email});
    if(!teacher){
        return res.json({message : "Invalid login credentials"});
    };

    // Verify password
    const isMatched = await isPassMatched(password, teacher?.password);
    if(!isMatched){
        return res.json({message : "Invalid login credentials"});
    } else{
        res.status(200).json({
            status: "success",
            message: "Teacher logged in successfully",
            data: generateToken(teacher?._id),
        })
    }
})