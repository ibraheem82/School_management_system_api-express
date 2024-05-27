const express = require("express");
const { adminRegisterStudent, loginStudent, getStudentProfile, getAllStudentsByAdmin } = require("../../controller/students/studentsCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const isStudentLogin = require("../../middlewares/isStudentLogin");
const isStudent = require("../../middlewares/isStudent");
const studentRouter = express.Router()


studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/profile", isStudentLogin, isStudent, getStudentProfile);
studentRouter.get("/admin", isLogin, isAdmin, getAllStudentsByAdmin);


module.exports = studentRouter;