const express = require("express");
const globalErrHandler = require("../middlewares/globalErrHandler");
// const morgan = require("morgan");
const adminRouter = require("../routes/staff/adminRouter");


const app = express();

// ----- MIDDLEWARES -----
// app.use(morgan('dev'));
app.use(express.json()); // This allows the application to parse incoming JSON data in request bodies.


// ** Routes ** //

// Router now been used as a middleware
app.use('/api/v1/admins', adminRouter); // app.use accept any http methods, HTTP request that starts with /api/v1/admins will trigger the middleware function adminRouter.meaning that any incoming HTTP request with a path starting with /api/v1/admins will be passed to the adminRouter middleware for further processing. This could include handling specific CRUD (Create, Read, Update, Delete) operations related to admins, authentication, authorization, or any other logic specific to admin-related functionality in your application.


// ** -- Error Middlewares --
app.use(globalErrHandler);

module.exports = app