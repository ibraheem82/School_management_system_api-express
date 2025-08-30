const express = require("express");
const { adminRegisterTeacher, loginTeacher, getAllTeachersAdmin, getTeacherByAdmin, getTeacherProfile, teacherUpdateProfile, adminUpdateTeacher } = require("../../controller/staff/teachersControllers");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const isTeacher = require("../../middlewares/isTeacher");

const teacherRouter = express.Router()

// register teacher
teacherRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teacherRouter.post("/login", loginTeacher);
teacherRouter.get("/admin", isLogin, isAdmin, getAllTeachersAdmin);
teacherRouter.get("/profile", isTeacherLogin, isTeacher, getTeacherProfile);
// ! Always put route with ID's Below other routes
teacherRouter.get("/:teacherID/admin", isLogin, isAdmin, getTeacherByAdmin);
teacherRouter.put("/:teacherID/update", isTeacherLogin, isTeacher, teacherUpdateProfile);

teacherRouter.put(
    "/:teacherID/update/admin",
  isLogin, 
   isAdmin,
  adminUpdateTeacher);

module.exports = teacherRouter;