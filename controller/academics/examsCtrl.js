const AsyncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const Teacher = require("../../model/Staff/Teacher");




// @desc  Create Exam
// @route POST /api/v1/exams
// @access Private Teachers only

exports.createExam = AsyncHandler(async(req, res) => {
    const {name, description, subject, program, academicTerm, duration, examDate, examTime, examType, createdBy, academicYear} = req.body;

    // Find teacher

    const teacherFound = await Teacher.findById(req.userAuth?._id);
    if(!teacherFound){
        throw new Error("Teacher not found.")
    }

    // exam exists 
    const examExists = await Exam.findOne({name});

    if(examExists){
        throw new Error("Exam already exists.")
    }

    const examCreated = new Exam({
        name,
        description,
        academicTerm,
        duration,
         examDate,
         examTime, 
         examType,
          createdBy : req.userAuth?._id,
           academicYear,
           subject,
            program,

    });

    // push exam into teacher
    teacherFound.examsCreated.push(examCreated._id)

    // Save exam
    await examCreated.save();
    await teacherFound.save();

    res.status(201).json({
        status: 'Success',
        message: "Exam created successfully",
        data : examCreated
    });
});