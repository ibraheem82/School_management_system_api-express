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
        password : hashedPassword,
        createdBy : req.userAuth._id, // Set the creator of the teacher
    });

    // Find the admin and associate the teacher
    const admin = await Admin.findById(req.userAuth._id);
    if (!admin) {
        throw new Error("Admin not found."); // This should ideally not happen if isLogin and isAdmin work correctly
    }
    admin.teachers.push(teacherCreated._id);
    await admin.save();

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
            user: { ...teacher.toObject(), role: 'teacher' },
            token: generateToken(teacher?._id),
        })
    }
})



// @desc Get all teachers
// @route GET /api/v1/teachers/admin
// @access Private admin only

exports.getAllTeachersAdmin = AsyncHandler(async (req, res) => {
    const teachers = await Teacher.find().select('-password -createdAt -updatedAt');
        res.status(200).json({
            status: "success",
            message: "Teachers fetched successfully",
            data: teachers
    })
})


// @desc Get single teacher
// @route GET /api/v1/teachers/:teacherID/admin
// @access Private admin only

exports.getTeacherByAdmin = AsyncHandler(async (req, res) => {
    const teacherID = req.params.teacherID;
    const teacher = await Teacher.findById(teacherID).select('-password -createdAt -updatedAt');
    if(!teacher){
        throw new Error("Teacher not found!")
    }
        res.status(200).json({
            status: "success",
            message: "Teacher fetched successfully",
            data: teacher
    })
})



// @desc Teacher profile
// @route GET /api/v1/teachers/profile
// @access Private Teacher only

exports.getTeacherProfile = AsyncHandler(async (req, res) => {
    const teacher = await Teacher.findById(req.userAuth?._id).select('-password -createdAt -updatedAt');
    if(!teacher){
        throw new Error("Teacher not found!")
    }
        res.status(200).json({
            status: "success",
            message: "Teacher's Profile fetched successfully",
            data: teacher
    })
})


// @desc   TEACHER UPDATING PROFILE
// @route UPDATE /api/v1/teachers/:teacherID/update
// @access Private TEACHER ONLY
exports.teacherUpdateProfile = AsyncHandler( async (req, res) => {
    const {email, name, password} = req.body;
    // * If email is taken
    const emailExist = await Teacher.findOne({email})
    if(emailExist){
        throw new Error('This email is taken/exist');
    }

   

    // ** Check if the user is updating password
    if(password){
        // Update()
        const teacher  = await Teacher.findByIdAndUpdate(req.userAuth._id, {
            email,
            password : await hashPassword(password),
            name,
        },{
            new:true,
            runValidators : true,
        });

        res.status(200).json({
            status: 'success ✅',
            data : teacher,
            message: "Teacher updated successfully.",
        });
    } else{
        // Update()
        const teacher  = await Teacher.findByIdAndUpdate(req.userAuth._id, {
            email,
            name,
        },{
            new:true,
            runValidators : true,
        });

        res.status(200).json({
            status: 'success ✅',
            data : teacher,
            message: "Teacher updated successfully.",
        });
    }
    
});




// @desc   Admin UPDATING  Teacher PROFILE
// @route UPDATE /api/v1/teachers/:teacherID/admin
// @access Private Admin ONLY
exports.adminUpdateTeacher = AsyncHandler( async (req, res) => {
    const {program, classLevel, academicYear, subject} = req.body;
    const teacherFound = await Teacher.findById(req.params.teacherID)
    if(!teacherFound){
        throw new Error('Teacher not found...');
    }

    // Check if teacher is withdraw

        if(teacherFound.isWitdrawn){
            throw new Error("Action denied, teacher is withdraw")
        }


    // * Assign a program
    if(program){
        teacherFound.program = program
        await teacherFound.save();
        res.status(200).json({
            status: 'success ✅',
            data : teacherFound,
            message: "Teacher updated successfully.",
        });
    }



    // Assign class level
    if(classLevel){
        teacherFound.classLevel = classLevel
        await teacherFound.save()
        res.status(200).json({
            status: 'success ✅',
            data : teacherFound,
            message: "Teacher updated successfully.",
        });
    }

     // Assign Academic year
     if(academicYear){
        teacherFound.academicYear = academicYear
        await teacherFound.save()
        res.status(200).json({
            status: 'success ✅',
            data : teacherFound,
            message: "Teacher updated successfully.",
        });
    }

     // Assign Subject
     if(subject){
        teacherFound.subject = subject
        await teacherFound.save()
        res.status(200).json({
            status: 'success ✅',
            data : teacherFound,
            message: "Teacher updated successfully.",
        });
    }
        

    
});
