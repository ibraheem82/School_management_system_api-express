const AsyncHandler = require("express-async-handler");
const ClassLevel = require("../../model/Academic/ClassLevel");
const Admin = require("../../model/Staff/Admin");




// @desc  Create Class Level
// @route POST  /api/v1/class-levels
// @access Private
exports.createClassLevel = AsyncHandler(async (req, res) => {
    const {name, description}  = req.body

    const classFound = await ClassLevel.findOne({name});

    if (classFound) {
        throw new Error("Class already exists");
    }

    const classCreated = await ClassLevel.create({
        name,
        description,
        createdBy : req.userAuth._id,
    });
    // * Push class into admin
    const admin = await Admin.findById(req.userAuth._id);
    // * Pushing to the class levels in the admin, there is a field in the admin model, called classLevels, so are pushing to that.
    admin.classLevels.push(classCreated._id);
    await admin.save()
    res.status(201).json({
        status: 'Success',
        message: "Class created successfully",
        data : classCreated
    });
});



// @desc  get All class levels
// @route GET  /api/v1/class-levels
// @access Private
exports.getClassLevels = AsyncHandler(async (req, res) => {

    const classes = await ClassLevel.find();
    res.status(200).json({
        status: 'Success',
        message: "Class levels fetched successfully",
        data : classes
    });
});



// @desc  Get single Class level
// @route GET  /api/v1/class-levels/:id
// @access Private
exports.getClassLevel = AsyncHandler(async (req, res) => {
    const classLevel = await ClassLevel.findById(req.params.id);
    res.status(200).json({
        status: 'Success',
        message: "Class Level fetched successfully",
        data : classLevel
    });
});



// @desc  UPDATE Class Level
// @route PUT /api/v1/class-levels/:id
// @access Private
exports.updateClassLevel = AsyncHandler(async (req, res) => {

    const {name, description}  = req.body;
    const classFound = await ClassLevel.findOne({name})
    if(classFound){
        throw new Error("Class already exists.")
    }
    const classLevel = await ClassLevel.findByIdAndUpdate(req.params.id, 
    {
        name,
        description,
        createdBy: req.userAuth._id
    },
    {
        new: true
    }
    );
    res.status(200).json({
        status: 'Success',
        message: "Class level updated successfully",
        data : classLevel
    });
});



// @desc  DELETE Class level
// @route delete /api/v1/class-levels/:id
// @access Private
exports.deleteClassLevel = AsyncHandler(async (req, res) => {
    await ClassLevel.findByIdAndDelete(req.params.id)
    
    res.status(200).json({
        status: 'Success',
        message: "Class Level deleted successfully"
    });
});
