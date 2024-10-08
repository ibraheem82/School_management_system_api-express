const express = require("express");
const { registerAdminCtrl, loginAdminCtrl, adminPublishResultsCtrl, adminUnPublishResultsCtrl, adminSuspendTeacherCtrl, adminUnSuspendTeacherCtrl, adminWithdrawTeacherCtrl, deleteAdminCtrl, getAdminsCtrl, adminUnWithdrawTeacherCtrl, updateAdminCtrl, getAdminProfileCtrl } = require("../../controller/staff/adminController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const adminRouter = express.Router()

// register
adminRouter.post("/register", registerAdminCtrl);


// Login
adminRouter.post("/login", loginAdminCtrl)


// Get all
adminRouter.get("/", isLogin, getAdminsCtrl);

//  single
adminRouter.get("/profile", isLogin, isAdmin, getAdminProfileCtrl)


// Update admin
adminRouter.put("/:id", isLogin, isAdmin, updateAdminCtrl);

// Delete admin
adminRouter.delete("/:id", deleteAdminCtrl)


// suspend
adminRouter.put("/suspend/teacher/:id", adminSuspendTeacherCtrl)


// unsuspend
adminRouter.put("/unsuspend/teacher/:id", adminUnSuspendTeacherCtrl
);


// withdraw
adminRouter.put("/withdraw/teacher/:id",  adminWithdrawTeacherCtrl)


// unwithdraw
adminRouter.put("/unwithdraw/teacher/:id", adminUnWithdrawTeacherCtrl)



// publish exams
adminRouter.put("/publish/exam/:id", adminPublishResultsCtrl)



// unpublish exams results
adminRouter.put("/unpublish/exam/:id",adminUnPublishResultsCtrl)





module.exports = adminRouter;