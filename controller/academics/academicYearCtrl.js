const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");


// @desc  Create Academic Year
// @route POST  /api/v1/academic-years
// @access Private
exports.createAcademicYear = AsyncHandler(async (req, res) => {
    const {name, fromYear, toYear}  = req.body

    const academicYear = await AcademicYear.findOne({name});

    if (academicYear) {
        throw new Error("Academic year already exists");
    }

    const academicYearCreated = await AcademicYear.create({
        name,
        fromYear,
        toYear,
        createdBy : req.userAuth._id,
    });
    // * Push academic year into admin
    // academicYears is an array within the admin schema that stores IDs of academic years associated with that admin.
// The push method is used to add a new element to the end of the academicYears array.
// The element being added is academicYearCreated._id, which is refers to the ID of a newly created academic year object. This ID is obtained from the academicYearCreated variable.
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicYears.push(academicYearCreated._id)
    res.status(201).json({
        status: 'Success',
        message: "Academic year created successfully",
        data : academicYearCreated
    });
});



// @desc  get ALl Academic Years
// @route GET  /api/v1/academic-years
// @access Private
exports.getAcademicYears = AsyncHandler(async (req, res) => {

    const academicYears = await AcademicYear.find();
    res.status(200).json({
        status: 'Success',
        message: "Academic years fetched successfully",
        data : academicYears
    });
});



// @desc  Get Single Academic Year
// @route GET  /api/v1/academic-years/:id
// @access Private
exports.getAcademicYear = AsyncHandler(async (req, res) => {

    const academicYear = await AcademicYear.findById(req.params.id);
    res.status(200).json({
        status: 'Success',
        message: "Academic year fetched successfully",
        data : academicYear
    });
});



// @desc  UPDATE Academic Year
// @route PUT /api/v1/academic-years/:id
// @access Private
exports.updateAcademicYear = AsyncHandler(async (req, res) => {

    const {name, fromYear, toYear}  = req.body;
    // ! If name already Exists
    const createAcademicYearFound = await AcademicYear.findOne({name})
    if(createAcademicYearFound){
        throw new Error("Academic year already exists.")
    }
    const academicYear = await AcademicYear.findByIdAndUpdate(req.params.id, 
    {
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth._id
    },
    {
        new: true
    }
    );
    res.status(200).json({
        status: 'Success',
        message: "Academic year updated successfully",
        data : academicYear
    });
});



// @desc  DELETE Academic Year
// @route delete /api/v1/academic-years/:id
// @access Private
exports.deleteAcademicYear = AsyncHandler(async (req, res) => {
    await AcademicYear.findByIdAndDelete(req.params.id)
    
    res.status(200).json({
        status: 'Success',
        message: "Academic year deleted successfully"
    });
});
