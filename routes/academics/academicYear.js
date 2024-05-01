const express = require("express");
const { createAcademicYear, getAcademicYears, getAcademicYear } = require("../../controller/academics/academicYearCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");


const academicYearRouter = express.Router();

academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear)
academicYearRouter.get("/", getAcademicYears)
academicYearRouter.get("/:id", getAcademicYear)

module.exports = academicYearRouter;