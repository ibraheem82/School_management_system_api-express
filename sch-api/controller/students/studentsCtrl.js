const AsyncHandler = require("express-async-handler");
const Student = require("../../model/Academic/Student");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");
const Exam = require("../../model/Academic/Exam");




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
            user: { ...student.toObject(), role: 'student' },
            token: generateToken(student?._id),
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


// @desc Get all students
// @route GET /api/v1/admin/students
// @access Private admin only

exports.getAllStudentsByAdmin = AsyncHandler(async (req, res) => {
    const students = await Student.find();
        res.status(200).json({
            status: "success",
            message: "Students fetched successfully",
            data: students
    });
});




// @desc Get single student
// @route GET /api/v1/students/:studentID/admin
// @access Private admin only

exports.getStudentByAdmin = AsyncHandler(async (req, res) => {
    const studentID = req.params.studentID;
    const student = await Student.findById(studentID);
    if(!student){
        throw new Error("Student not found!")
    }
        res.status(200).json({
            status: "success",
            message: "Student fetched successfully",
            data: student
    })
})



// @desc   Student UPDATING PROFILE
// @route UPDATE /api/v1/students/update
// @access Private STUDENT ONLY
exports.studentUpdateProfile = AsyncHandler( async (req, res) => {
    const {email, password} = req.body;
    // * If email is taken
    const emailExist = await Student.findOne({email})
    if(emailExist){
        throw new Error('This email is taken/exist');
    }

   

    // ** Check if the user is updating password
    if(password){
        // Update()
        const student  = await Student.findByIdAndUpdate(req.userAuth._id, {
            email,
            password : await hashPassword(password),
        },{
            new:true,
            runValidators : true,
        });

        res.status(200).json({
            status: 'success ✅',
            data : student,
            message: "Student updated successfully.",
        });
    } else{
        // Update()
        const student  = await Student.findByIdAndUpdate(req.userAuth._id, {
            email,
        },{
            new:true,
            runValidators : true,
        });

        res.status(200).json({
            status: 'success ✅',
            data : student,
            message: "Student updated successfully.",
        });
    }
    
});



// @desc   Admin updating student e.g assigning classes...
// @route UPDATE /api/v1/students/:studentID/update/admin
// @access Private ADMIN ONLY

exports.adminUpdateStudent = AsyncHandler( async (req, res) => {
    const {classLevels, academicYear, program, name, email, prefectName} = req.body;
    // * If email is taken
    const studentFound = await Student.findById(req.params.studentID);
    if(!studentFound){
        throw new Error("Student not found")
    }
    // update
    const studentUpdated = await Student.findByIdAndUpdate(req.params.studentID, {
        // This operator is used to update existing fields in the student document.
        $set:{
            name,
            email, 
            academicYear,
            program,
            prefectName
        },

        
        // $addToSet will put an element in an array, if the element exist it will not bother to add it, so in short it avoides duplications of documents.
        // This operator is used to add elements to an array field.
        $addToSet:{
            classLevels
        },


    }, {
        new:true,
    });
    
    res.status(200).json({
        status: "success",
        message: "Student Updated successfully",
        data: studentUpdated
    });
});


// @desc  Student taking exams
// @route POST /api/v1/students/exam/:examID/write
// @access Private Student only
exports.writeExam = AsyncHandler(async (req, res) => {

    const studentFound = await Student.findById(req.userAuth?._id);
    if(!studentFound){
        throw new Error("Student not found")
    }

    // Get exam
    // It will get all question associated with that particular exam you are looking for.
    const examFound = await Exam.findById(req.params.examID).populate("questions");

    if(!examFound){
        throw new Error("Exam not found")
    }

    const questions = examFound?.questions;

    const studentAnswers = req.body.answers;

    if(studentAnswers.length !== questions.length){
        throw new Error ("You have not answered all the questions.")
    }

    // * Building reports
    let correctanswers = 0;
    let wrongAnswers = 0;
    let totalQuestions = 0;
    let grade = 0;
    let score = 0;
    let answeredQuestions = [];

    // * Check for answers
    for(let i  = 0; i < questions.length; i++){
        // * find the question
        const question = questions[i];
        console.log(question);

        // * check if answer is correct.
        if(question.correctAnswer === studentAnswers[i]){
            correctanswers++;
            score++;
            question.isCorrect = true;

        } else {
            wrongAnswers++;
        }
    }
    res.status(200).json({
        status: "success",
        correctanswers,
        wrongAnswers,
        score,
        questions
    });
});
