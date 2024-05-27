const AsyncHandler = require("express-async-handler");
const Student = require("../../model/Academic/Student");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");




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



// @desc Login student
// @route POST /api/v1/students/login
// @access 

exports.loginStudent = AsyncHandler(async (req, res) => {
    const {email, password}  = req.body
    // find student
    const student = await Student.findOne({email});
    if(!student){
        return res.json({message : "Invalid login credentials"});
    };

    // Verify password
    const isMatched = await isPassMatched(password, student?.password);
    if(!isMatched){
        return res.json({message : "Invalid login credentials"});
    } else{
        res.status(200).json({
            status: "success",
            message: "Student logged in successfully",
            data: generateToken(student?._id),
        })
    }
})



// @desc Student profile
// @route GET /api/v1/students/profile
// @access Private Student only

exports.getStudentProfile = AsyncHandler(async (req, res) => {
    const student = await Student.findById(req.userAuth?._id).select('-password -createdAt -updatedAt');
    if(!student){
        throw new Error("Student not found!")
    }
        res.status(200).json({
            status: "success",
            message: "Student's Profile fetched successfully",
            data: student
    })
})