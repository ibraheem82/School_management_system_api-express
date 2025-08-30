const express = require("express");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const {globalErrHandler, notFoundErr} = require("../middlewares/globalErrHandler");
// const morgan = require("morgan");
const academicYearRouter = require("../routes/academics/academicYear");
const academicTermRouter = require("../routes/academics/academicTerm");
const classLevelRouter = require("../routes/academics/classLevel");
const programRouter = require("../routes/academics/program");
const adminRouter = require("../routes/staff/adminRouter");
const subjectRouter = require("../routes/academics/subject");
const yearGroupRouter = require("../routes/academics/yearGroup");
const teacherRouter = require("../routes/staff/teachers");
const performanceMW = require("../middlewares/performanceLoggingMiddleware");
const examRouter = require("../routes/academics/examRoutes");
const studentRouter = require("../routes/staff/student");
const questionsRouter = require("../routes/academics/questionRoutes");
// const morgan = require("morgan");





const app = express();
const path = require('path');




// ----- MIDDLEWARES -----
// app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));
app.use(performanceMW)
app.use(express.json()); // This allows the application to parse incoming JSON data in request bodies.
app.use(cors()); // Enable CORS for all routes

const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API',
        version: '1.0.0',
        description: 'Your API Description'
      },
      servers: [
        {
          url: 'http://127.0.0.1:2024',
          description: 'Local server'
        }
      ]
    },
    apis: ['../routes/staff/*.js', '../controller/staff/*.js']
  };
  
  const swaggerSpec = swaggerJSDoc(options);
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ** Routes ** //

// Router now been used as a middleware
app.use('/api/v1/admins', adminRouter); // app.use accept any http methods, HTTP request that starts with /api/v1/admins will trigger the middleware function adminRouter.meaning that any incoming HTTP request with a path starting with /api/v1/admins will be passed to the adminRouter middleware for further processing. This could include handling specific CRUD (Create, Read, Update, Delete) operations related to admins, authentication, authorization, or any other logic specific to admin-related functionality in your application.
app.use('/api/v1/academic-years', academicYearRouter);
app.use('/api/v1/academic-terms', academicTermRouter);
app.use('/api/v1/class-levels', classLevelRouter);
app.use('/api/v1/programs', programRouter);
app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/year-groups', yearGroupRouter);
app.use('/api/v1/teachers', teacherRouter);
app.use('/api/v1/exams', examRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/questions', questionsRouter);

// ** -- Error Middlewares --
app.use(notFoundErr)
app.use(globalErrHandler);

module.exports = app