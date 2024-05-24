const express = require("express");
const { createExam, getExams } = require("../../controller/academics/examsCtrl");
const isTeacher = require("../../middlewares/isteacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");



const examRouter = express.Router();


examRouter
    .route("/", isTeacherLogin, isTeacher)
    .post(createExam)
    .get(getExams)


// classLevelRouter
//     .route("/:id")
//     .get(isLogin, isAdmin, getClassLevel)
//     .put(isLogin, isAdmin, updateClassLevel)
//     .delete(isLogin, isAdmin, deleteClassLevel)


module.exports = examRouter;