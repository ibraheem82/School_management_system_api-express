const express = require("express");
const { adminRegisterTeacher, loginTeacher } = require("../../controller/staff/teachersControllers");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const teacherRouter = express.Router()

// register teacher
teacherRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teacherRouter.post("/login", loginTeacher);






module.exports = teacherRouter;