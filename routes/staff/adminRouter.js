const express = require("express");

const adminRouter = express.Router()

// register
adminRouter.post("/regsiter", (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data : 'Admin has been registered'
        });
    } catch (error) {
        res.json({
            status: 'failed',
            error : error.message,

        })
    }

});


// Login
adminRouter.post("/login",  (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data : 'Admin has been logged in'
        });
    } catch (error) {
        res.json({
            status: 'failed',
            error : error.message,

        })
    }

})


// Get all
adminRouter.get("/",  (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data : 'All admins'
        });
    } catch (error) {
        res.json({
            status: 'failed',
            error : error.message,

        })
    }

});

//  single
adminRouter.get("/:id",  (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data : 'Single admin'
        });
    } catch (error) {
        res.json({
            status: 'failed',
            error : error.message,

        })
    }

})


// Upate admin
adminRouter.put("/:id",  (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data : 'update admin'
        });
    } catch (error) {
        res.json({
            status: 'failed',
            error : error.message,

        })
    }

});

// Delete admin
adminRouter.delete("/:id", (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data : 'delete admin'
        });
    } catch (error) {
        res.json({
            status: 'failed',
            error : error.message,

        })
    }

})


// suspend
adminRouter.put("/suspend/teacher/:id",  (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data : 'admin suspend teacher'
        });
    } catch (error) {
        res.json({
            status: 'failed',
            error : error.message,

        })
    }

})


// unsuspend
adminRouter.put("/unsuspend/teacher/:id",  (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data : 'admin unsuspend teacher'
        });
    } catch (error) {
        res.json({
            status: 'failed',
            error : error.message,

        })
    }

});


// withdraw
adminRouter.put("/withdraw/teacher/:id",  (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data : 'admin withdraw teacher'
        });
    } catch (error) {
        res.json({
            status: 'failed',
            error : error.message,

        })
    }

})


// unwithdraw
adminRouter.put("/unwithdraw/teacher/:id",  (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data : 'admin Unwithdraw teacher'
        });
    } catch (error) {
        res.json({
            status: 'failed',
            error : error.message,

        })
    }

})



// publish exams
adminRouter.put("/publish/exam/:id", (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data : 'admin publish exam results'
        });
    } catch (error) {
        res.json({
            status: 'failed',
            error : error.message,

        })
    }

})



// unpublish exams results
adminRouter.put("/unpublish/exam/:id", (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data : 'admin unpublish exam results'
        });
    } catch (error) {
        res.json({
            status: 'failed',
            error : error.message,

        })
    }

})





module.exports = adminRouter;