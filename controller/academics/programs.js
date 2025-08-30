const AsyncHandler = require("express-async-handler");
const Program = require("../../model/Academic/Program");
const Admin = require("../../model/Staff/Admin");




// @desc  Create program
// @route POST  /api/v1/programs
// @access Private
exports.createProgram = AsyncHandler(async (req, res) => {
    const {name, description}  = req.body

    const programFound = await Program.findOne({name});

    if (programFound) {
        throw new Error("Program already exists");
    }

    const programCreated = await Program.create({
        name,
        description,
        createdBy : req.userAuth._id,
    });
    // * Push program into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.programs.push(programCreated._id);
    await admin.save()
    res.status(201).json({
        status: 'Success',
        message: "Program created successfully",
        data : programCreated
    });
});



// @desc  get All Programs
// @route GET  /api/v1/programs
// @access Private
exports.getPrograms = AsyncHandler(async (req, res) => {
    const programs = await Program.find();
    res.status(200).json({
        status: 'Success',
        message: "Programs fetched successfully",
        data : programs
    });
});



// @desc  Get single Program
// @route GET  /api/v1/programs/:id
// @access Private
exports.getProgram = AsyncHandler(async (req, res) => {
    const program = await Program.findById(req.params.id);
    res.status(200).json({
        status: 'Success',
        message: "Program fetched successfully",
        data : program
    });
});



// @desc  UPDATE Program
// @route PUT /api/v1/programs/:id
// @access Private
exports.updateProgram = AsyncHandler(async (req, res) => {

    const {name, description, duration}  = req.body;
    const programFound = await Program.findOne({name})
    if(programFound){
        throw new Error("Program already exists.")
    }
    const program = await Program.findByIdAndUpdate(req.params.id, 
    {
        name,
        description,
        duration,
        createdBy: req.userAuth._id
    },
    {
        new: true
    }
    );
    res.status(200).json({
        status: 'Success',
        message: "Program updated successfully",
        data : program
    });
});



// @desc  DELETE Program
// @route delete /api/v1/programs/:id
// @access Private
exports.deleteProgram = AsyncHandler(async (req, res) => {
    const program = await Program.findByIdAndDelete(req.params.id)

    if (!program) {
        throw new Error("Program does'nt exists / already deleted.");
    }
    
    res.status(200).json({
        status: 'Success',
        message: "Program deleted successfully"
    });
});
