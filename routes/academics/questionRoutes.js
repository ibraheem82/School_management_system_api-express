const express = require("express");
const { createQuestion } = require("../../controller/academics/questionsCtrl");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const questionsRouter = express.Router();


questionsRouter.post("/:examID", isTeacherLogin, isTeacher, createQuestion)

module.exports = questionsRouter;