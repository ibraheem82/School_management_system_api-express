const AsyncHandler = require("express-async-handler");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
const Admin = require("../../model/Staff/Admin");



// @desc  Create Academic Term
// @route POST  /api/v1/academic-terms
// @access Private
exports.createAcademicTerm = AsyncHandler(async (req, res) => {
    const {name, description, duration}  = req.body

    const AcademicTerm = await AcademicTerm.findOne({name});

    if (AcademicTerm) {
        throw new Error("Academic year already exists");
    }

    const academicTermCreated = await AcademicTerm.create({
        name,
        description,
        duration,
        createdBy : req.userAuth._id,
    });
    // * Push academic term into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicTerms.push(academicTermCreated._id);
    await admin.save()
    res.status(201).json({
        status: 'Success',
        message: "Academic year created successfully",
        data : academicTermCreated
    });
});



// @desc  get ALl Academic Terms
// @route GET  /api/v1/academic-terms
// @access Private
exports.getAcademicTerms = AsyncHandler(async (req, res) => {

    const academicTerms = await AcademicTerm.find();
    res.status(200).json({
        status: 'Success',
        message: "Academic years fetched successfully",
        data : academicTerms
    });
});



// @desc  Get Single Academic Term
// @route GET  /api/v1/academic-terms/:id
// @access Private
exports.getAcademicTerm = AsyncHandler(async (req, res) => {

    const academicTerms = await AcademicTerm.findById(req.params.id);
    res.status(200).json({
        status: 'Success',
        message: "Academic year fetched successfully",
        data : academicTerms
    });
});



// @desc  UPDATE Academic Term
// @route PUT /api/v1/academic-terms/:id
// @access Private
exports.updateAcademicTerm = AsyncHandler(async (req, res) => {

    const {name, description, duration}  = req.body;
    const createAcademicTermFound = await AcademicTerm.findOne({name})
    if(createAcademicTermFound){
        throw new Error("Academic year already exists.")
    }
    const academicTerms = await AcademicTerm.findByIdAndUpdate(req.params.id, 
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
        message: "Academic year updated successfully",
        data : academicTerms
    });
});



// @desc  DELETE Academic Year
// @route delete /api/v1/academic-terms/:id
// @access Private
exports.deleteAcademicTerm = AsyncHandler(async (req, res) => {
    await AcademicTerm.findByIdAndDelete(req.params.id)
    
    res.status(200).json({
        status: 'Success',
        message: "Academic term deleted successfully"
    });
});
