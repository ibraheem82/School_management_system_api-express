const AsyncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const Teacher = require("../../model/Staff/Teacher");




// @desc  Create Exam
// @route POST /api/v1/exams
// @access Private Teachers only

exports.createExam = AsyncHandler(async(req, res) => {
    const {name, description, subject, program, academicTerm, duration, examDate, examTime, examType, createdBy, academicYear, classLevel} = req.body;

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
        academicYear,
        classLevel,
        duration,
         examDate,
         examTime, 
         examType,
         subject,
         program,
         createdBy : req.userAuth?._id,
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


// @desc  get All Exams
// @route GET  /api/v1/exams
// @access Private
exports.getExams = AsyncHandler(async (req, res) => {
    const exams = await Exam.find();
    res.status(200).json({
        status: 'Success ✅',
        message: "Exams fetched successfully",
        data : exams
    });
});



// @desc  Get single Exam
// @route GET  /api/v1/exams/:id
// @access Private Teachers only
exports.getExam = AsyncHandler(async (req, res) => {
    const exam = await Exam.findById(req.params.id);
    res.status(200).json({
        status: 'Success',
        message: "Exam fetched successfully",
        data : exam
    });
});


// @desc  UPDATE Exam
// @route PUT /api/v1/exams/:id
// @access Private teacher only
exports.updateExam = AsyncHandler(async (req, res) => {

    const {name, description, subject, program, academicTerm, duration, examDate, examTime, examType, createdBy, academicYear, classLevel} = req.body;
    const examFound = await Exam.findOne({name})
    if(examFound){
        throw new Error("Exam already exists.")
    }
    const examUpdated  = await Exam.findByIdAndUpdate(req.params.id, 
    {
        name, description, subject, program, academicTerm, duration, examDate, examTime, examType, createdBy, academicYear, classLevel,
        createdBy: req.userAuth._id
    },
    {
        new: true
    }
    );
    res.status(200).json({
        status: 'Success ✅',
        message: "Exam updated successfully",
        data : examUpdated
    });
});

