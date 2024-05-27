const express = require("express");
const { adminRegisterStudent } = require("../../controller/students/studentsCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const studentRouter = express.Router()


studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);


module.exports = studentRouter;