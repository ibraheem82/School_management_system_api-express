const express = require("express");
const {globalErrHandler, notFoundErr} = require("../middlewares/globalErrHandler");
// const morgan = require("morgan");
const academicYearRouter = require("../routes/academics/academicYear");
const academicTermRouter = require("../routes/academics/academicTerm");
const classLevelRouter = require("../routes/academics/classLevel");
const programRouter = require("../routes/academics/program");
const adminRouter = require("../routes/staff/adminRouter");
const subjectRouter = require("../routes/academics/subject");
const yearGroupRouter = require("../routes/academics/yearGroup");





const app = express();

// ----- MIDDLEWARES -----
// app.use(morgan('dev'));
app.use(express.json()); // This allows the application to parse incoming JSON data in request bodies.


// ** Routes ** //

// Router now been used as a middleware
app.use('/api/v1/admins', adminRouter); // app.use accept any http methods, HTTP request that starts with /api/v1/admins will trigger the middleware function adminRouter.meaning that any incoming HTTP request with a path starting with /api/v1/admins will be passed to the adminRouter middleware for further processing. This could include handling specific CRUD (Create, Read, Update, Delete) operations related to admins, authentication, authorization, or any other logic specific to admin-related functionality in your application.
app.use('/api/v1/academic-years', academicYearRouter);
app.use('/api/v1/academic-terms', academicTermRouter);
app.use('/api/v1/class-levels', classLevelRouter);
app.use('/api/v1/programs', programRouter);
app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/year-groups', yearGroupRouter);

// ** -- Error Middlewares --
app.use(notFoundErr)
app.use(globalErrHandler);

module.exports = app