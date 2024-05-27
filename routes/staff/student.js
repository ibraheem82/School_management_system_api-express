const express = require("express");
const { adminRegisterStudent, loginStudent } = require("../../controller/students/studentsCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const studentRouter = express.Router()


studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.post("/login", loginStudent);


module.exports = studentRouter;