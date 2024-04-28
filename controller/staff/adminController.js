const AsyncHandler = require("express-async-handler"); //  package. This middleware helps handle asynchronous errors in Express routes more cleanly
const Admin = require("../../model/Staff/Admin");
const generateToken = require("../../utils/generateToken");

// @desc Register admin
// @route POST /api/v1/admins/register
// @access Private

// It's wrapped in AsyncHandler to handle potential asynchronous errors within the function.
exports.registerAdminCtrl = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
        // Check if email exists
        const adminFound = await Admin.findOne({email});
        if(adminFound){
            throw new Error('admin exists ❌');
        }

        // * Register
        const user = await Admin.create({
            name,
            email,
            password,
        });
        res.status(201).json({
            status: 'success ✅',
            data : user,
            Message: "Admin registered successfully",
        });
});



// @desc login admin
// @route POST /api/v1/admins/login
// @access Private
exports.loginAdminCtrl =  AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

        // find user
        const user = await Admin.findOne({
            email
        })

        if(!user){
            return res.json({
                message: "Invalid login credentials. ❌"
            });
        }
                // .verifyPassword()  is a method in the model that is verifying passwords of user.
        if(user && (await user.verifyPassword(password))){
            return res.json({
                data: generateToken(user._id), // generating the token for the user base on thier id's
                message: "Admin logged in successfully",
            });
        }else{
            return res.json({
                message: "Invalid login credentials."
            });
        }

});


// @desc  Get all admins
// @route GET /api/v1/admins/
// @access Private
exports.getAdminsCtrl = AsyncHandler( async (req, res) => {
  const admins = await Admin.find();
  res.status(200).json({
    status: 'success ✅',
    message: 'Admin fetched successfully',
    data: admins
  });
});


// @desc  Get single admin
// @route GET /api/v1/admins/:id
// @access Private
exports.getAdminProfileCtrl = AsyncHandler( async (req, res) => {
    const admin = await Admin.findById(req.userAuth._id).select('-password -createdAt -updatedAt')
    if(!admin){
        throw new Error("Admin not found")
    } else{
        res.status(200).json({
            status: 'success ✅',
            data : admin,
            message: "Admin profile fetched successfully."
        })
    }
    
})


// @desc   update admin
// @route UPDATE /api/v1/admins/:id
// @access Private
exports.updateAdminCtrl =  (req, res) => {
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

}


// @desc  Delete admin
// @route DELETE /api/v1/admins/:id
// @access Private
exports.deleteAdminCtrl = (req, res) => {
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

}


// @desc  admin suspend a teacher
// @route PUT  /api/v1/admins/suspend/teacher/:id
// @access Private
exports.adminSuspendTeacherCtrl =  (req, res) => {
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

}


// @desc  admin unsuspend a teacher
// @route PUT  /api/v1/admins/unsuspend/teacher/:id
// @access Private
exports.adminUnSuspendTeacherCtrl =  (req, res) => {
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

}


// @desc  admin withdraws a teacher
// @route PUT  /api/v1/admins/withdraw/teacher/:id
// @access Private
exports.adminWithdrawTeacherCtrl = (req, res) => {
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

}

// @desc  admin Unwithdraw a teacher
// @route PUT  /api/v1/admins/unwithdraw/teacher/:id
// @access Private
exports.adminUnWithdrawTeacherCtrl =  (req, res) => {
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

}


// @desc  admin publish exam result
// @route PUT  /api/v1/admins/publish/exam/:id
// @access Private
exports.adminPublishResultsCtrl = (req, res) => {
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

}



// @desc  admin Unpublish exam result
// @route PUT  /api/v1/admins/unpublish/exam/:id
// @access Private
exports.adminUnPublishResultsCtrl =  (req, res) => {
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

}


// ! -----------------------------------
// -----  OR -----

// ------ You can also export like this , when you want to export all of them to a single object.
// const registerAdminCtrl = (req, res) => {
//     try {
//         res.status(201).json({
//             status: 'success',
//             data : 'Admin has been registered'
//         });
//     } catch (error) {
//         res.json({
//             status: 'failed',
//             error : error.message,

//         })
//     }

// }
// module.exports = {
//     registerAdminCtrl,
// }