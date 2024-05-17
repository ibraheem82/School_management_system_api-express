const express = require("express");
const { adminRegisterTeacher, loginTeacher, getAllTeachersAdmin } = require("../../controller/staff/teachersControllers");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const teacherRouter = express.Router()

// register teacher
teacherRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teacherRouter.post("/login", loginTeacher);
teacherRouter.get("/admin", isLogin, isAdmin, getAllTeachersAdmin);

module.exports = teacherRouter;