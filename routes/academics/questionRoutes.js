const express = require("express");
const { createQuestion, getQuestions, getQuestion } = require("../../controller/academics/questionsCtrl");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const questionsRouter = express.Router();


questionsRouter.get("/", isTeacherLogin, isTeacher, getQuestions)
questionsRouter.get("/:id", isTeacherLogin, isTeacher, getQuestion)
questionsRouter.post("/:examID", isTeacherLogin, isTeacher, createQuestion)

module.exports = questionsRouter;