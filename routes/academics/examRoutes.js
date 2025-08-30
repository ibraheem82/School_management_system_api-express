const express = require("express");
const { createExam, getExams, getExam, updateExam } = require("../../controller/academics/examsCtrl");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const isTeacher = require("../../middlewares/isTeacher");



const examRouter = express.Router();


examRouter
    .route("/")
    .post(isTeacherLogin, isTeacher, createExam)
    .get(isTeacherLogin, isTeacher, getExams)


examRouter
    .route("/:id")
    .get(isTeacherLogin, isTeacher, getExam)
    .put(isTeacherLogin, isTeacher, updateExam)
    // .delete(isLogin, isAdmin, deleteClassLevel)


module.exports = examRouter;