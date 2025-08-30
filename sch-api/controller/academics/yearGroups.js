const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const Subject = require("../../model/Academic/Subject");
const YearGroup = require("../../model/Academic/YearGroup");




// @desc  Create year group
// @route POST  /api/v1/year-groups
// @access Private
exports.createYearGroup = AsyncHandler(async (req, res) => {
    const {name, academicYear}  = req.body
    // * find program

    const yeargroup = await YearGroup.findOne({name});
    if (yeargroup) {
        throw new Error("Year Group/Graduation already exist.");
    }

    const yearGroup = await YearGroup.create({
        name,
        academicYear,
        createdBy : req.userAuth._id,
    });
    // * find admin
    const admin = await Admin.findById(req.userAuth._id);
    if(!admin){
        throw new Error("Admin not found");
    }
    // Pushing the id of yearGroup into the [yearGroups] field in the admin model ().
    admin.yearGroups.push(yearGroup._id)
    await admin.save()
    res.status(201).json({
        status: 'Success ✅',
        message: "Year Group created successfully",
        data : yearGroup
    });
});



// @desc  get All Year groups
// @route GET  /api/v1/year-groups
// @access Private
exports.getYearGroups = AsyncHandler(async (req, res) => {
    const groups = await YearGroup.find();
    res.status(200).json({
        status: 'Success ✅',
        message: "Year Groups fetched successfully",
        data : groups
    });
});



// @desc  Get Year groups
// @route GET  /api/v1/year-groups/:id
// @access Private
exports.getYearGroup = AsyncHandler(async (req, res) => {
    const group = await YearGroup.findById(req.params.id);
    res.status(200).json({
        status: 'Success ✅',
        message: "Year Group fetched successfully",
        data : group
    });
});



// @desc  UPDATE Year group
// @route PUT /api/v1/year-groups/:id
// @access Private
exports.updateYearGroup = AsyncHandler(async (req, res) => {

    const {name,  academicYear}  = req.body;
    const yearGroupFound = await YearGroup.findOne({name})
    if(yearGroupFound){
        throw new Error("Year already exists.")
    }
    const yearGroup = await YearGroup.findByIdAndUpdate(req.params.id, 
    {
        name,
        academicYear,
        createdBy: req.userAuth._id
    },
    {
        new: true
    }
    );
    res.status(200).json({
        status: 'Success ✅',
        message: "Year updated successfully",
        data : yearGroup
    });
});



// @desc  DELETE Year Group
// @route delete /api/v1/year-groups/:id
// @access Private
exports.deleteYearGroup = AsyncHandler(async (req, res) => {
    await YearGroup.findByIdAndDelete(req.params.id)
    
    res.status(200).json({
        status: 'Success✅',
        message: "Year deleted successfully."
    });
});
