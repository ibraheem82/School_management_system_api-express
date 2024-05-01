const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear")


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
