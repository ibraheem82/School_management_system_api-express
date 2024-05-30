const AsyncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const Question = require("../../model/Academic/Questions");






// @desc  Create Question
// @route POST /api/v1/questions/:examID
// @access Private Teachers only

exports.createQuestion = AsyncHandler(async (req, res) => {
    const {question, optionA, optionB, optionC, optionD, correctAnswer} = req.body;

    // find exam
    const examFound = await Exam.findById(req.params.examID);
    if(!examFound){
        throw new Error("Exam not found.")
    }

    // check if question
    const questionExists = await Question.findOne({question})
    if(questionExists){
        throw new Error("Question already exists")
    }


    const questionCreated = await Question.create({
        question, optionA, optionB, optionC, optionD, correctAnswer, createdBy: req.userAuth._id,
    });

    // Add question into exam
    examFound.questions.push(questionCreated?._id);
    // save
    await examFound.save();
    res.status(201).json({
        status: "success",
        message: "Question created successfully.",
        data: questionCreated
    });

});



// @desc  get All Questions
// @route GET  /api/v1/questions
// @access Private Teacher only
exports.getQuestions = AsyncHandler(async (req, res) => {
    const questions = await Question.find();
    res.status(200).json({
        status: 'Success',
        message: "Questions fetched successfully",
        data : questions
    });
});
