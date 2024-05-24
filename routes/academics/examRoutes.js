const express = require("express");
const { createExam, getExams, getExam } = require("../../controller/academics/examsCtrl");
const isTeacher = require("../../middlewares/isteacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");



const examRouter = express.Router();


examRouter
    .route("/", isTeacherLogin, isTeacher)
    .post(createExam)
    .get(getExams)


examRouter
    .route("/:id", isTeacherLogin, isTeacher)
    .get(getExam)
    // .put(isLogin, isAdmin, updateClassLevel)
    // .delete(isLogin, isAdmin, deleteClassLevel)


module.exports = examRouter;