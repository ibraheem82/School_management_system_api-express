const AsyncHandler = require("express-async-handler");
const Program = require("../../model/Academic/Program");
const Subject = require("../../model/Academic/Subject");






// @desc  Create subject
// @route POST  /api/v1/subjects/:programsID
// @access Private
exports.createSubject = AsyncHandler(async (req, res) => {
    const {name, description, academicTerm}  = req.body
    // * find program

    const programFound = await Program.findById(req.params.programID);
    if (!programFound) {
        throw new Error("Program not found");
    }
    const subjectFound = await Subject.findOne({name});

    if (subjectFound) {
        throw new Error("Subject already exists");
    }

    const subjectCreated = await Subject.create({
        name,
        description,
        academicTerm,
        createdBy : req.userAuth._id,
    });
    // * Push to program 
    // pushing subject to the program, there is a subject field in the program model.
    programFound.subjects.push(subjectCreated._id)
    await programFound.save()
    res.status(201).json({
        status: 'Success ✅',
        message: "Subject created successfully",
        data : subjectCreated
    });
});



// @desc  get All Subjects
// @route GET  /api/v1/subjects
// @access Private
exports.getSubjects = AsyncHandler(async (req, res) => {
    const subjects = await Subject.find();
    res.status(200).json({
        status: 'Success ✅',
        message: "Subjects fetched successfully",
        data : subjects
    });
});



// @desc  Get single Subject
// @route GET  /api/v1/subjects/:id
// @access Private
exports.getSubject = AsyncHandler(async (req, res) => {
    const subject = await Subject.findById(req.params.id);
    res.status(200).json({
        status: 'Success ✅',
        message: "Subject fetched successfully",
        data : subject
    });
});



// @desc  UPDATE Subject
// @route PUT /api/v1/subjects/:id
// @access Private
exports.updateSubject = AsyncHandler(async (req, res) => {

    const {name, description, academicTerm}  = req.body;
    const subjectFound = await Subject.findOne({name})
    if(subjectFound){
        throw new Error("Subject already exists.")
    }
    const subject = await Subject.findByIdAndUpdate(req.params.id, 
    {
        name,
        description,
        academicTerm,
        createdBy: req.userAuth._id
    },
    {
        new: true
    }
    );
    res.status(200).json({
        status: 'Success ✅',
        message: "Subject updated successfully",
        data : subject
    });
});



// @desc  DELETE Subject
// @route delete /api/v1/subjects/:id
// @access Private
exports.deleteSubject = AsyncHandler(async (req, res) => {
    await Subject.findByIdAndDelete(req.params.id)
    
    res.status(200).json({
        status: 'Success✅',
        message: "Subject deleted successfully."
    });
});
