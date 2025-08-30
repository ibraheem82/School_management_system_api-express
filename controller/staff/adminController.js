const path = require('path');
const ejs = require('ejs');

const AsyncHandler = require("express-async-handler"); //  package. This middleware helps handle asynchronous errors in Express routes more cleanly
const emailManager = require("../../utils/emailManager");
const Admin = require("../../model/Staff/Admin");
const generateToken = require("../../utils/generateToken");
const { hashPassword, isPassMatched } = require("../../utils/helpers");

// @desc Register admin
// @route POST /api/v1/admins/register
// @access Private

// It's wrapped in AsyncHandler to handle potential asynchronous errors within the function.
/**
 * @swagger
 * /register-admin:
 *   post:
 *     summary: Register a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success ✅
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                 message:
 *                   type: string
 *                   example: Admin registered successfully
 *       500:
 *         description: Failed to register admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error ❌
 *                 message:
 *                   type: string
 *                   example: Failed to register admin. Please try again later.
 */
exports.registerAdminCtrl = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if email exists
    const adminFound = await Admin.findOne({ email });
    if (adminFound) {
        throw new Error('Admin exists.');
    }

    // Create user object but do not save yet
    const user = new Admin({
        name,
        email,
        password: await hashPassword(password),
    });

    try {
        // Render the email template
        const emailTemplate = await ejs.renderFile(path.join(__dirname, '../../templates', 'welcomeEmail.ejs'), { name: user.name });

        // Send email
        await emailManager(user.email, "Thanks for registering with us", emailTemplate);

        // Save user to database only if email is sent successfully
        await user.save();

        res.status(201).json({
            status: 'success ✅',
            data: user,
            message: "Admin registered successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error ❌',
            message: 'Failed to register admin. Please try again later.',
        });
    }
});



// @desc login admin
// @route POST /api/v1/admins/login
// @access Private
exports.loginAdminCtrl = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // find user
    const user = await Admin.findOne({
        email
    });

    if (!user) {
        return res.status(401).json({
            message: "Invalid login credentials."
        });
    }

    // Verify Password
    const isMatched = await isPassMatched(password, user.password);
    if (!isMatched) {
        return res.status(401).json({
            message: "Invalid login credentials."
        });

    } else {
        return res.status(200).json({
            token: generateToken(user._id),
            message: "Admin logged in successfully",
            user: { ...user.toObject(), role: 'admin' }
        });
    }
});


// @desc  Get all admins
// @route GET /api/v1/admins/
// @access Private
exports.getAdminsCtrl = AsyncHandler( async (req, res) => {
  const admins = await Admin.find().select('-password -createdAt -updatedAt').populate("academicYears");
  res.status(200).json({
    status: 'success ✅',
    message: 'Admins fetched successfully',
    data: admins
  });
});


// @desc  Get single admin
// @route GET /api/v1/admins/:id
// @access Private
exports.getAdminProfileCtrl = AsyncHandler( async (req, res) => {
    const admin = await Admin.findById(req.userAuth._id).select('-password -createdAt -updatedAt').populate("academicYears");
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
exports.updateAdminCtrl = AsyncHandler( async (req, res) => {
    const {email, name, password} = req.body;
    // * If email is taken
    const emailExist = await Admin.findOne({email})
    if(emailExist){
        throw new Error('This email is taken/exist');
    }

   

    // ** Check if the user is updating password
    if(password){
        // Update()
        const admin  = await Admin.findByIdAndUpdate(req.userAuth._id, {
            email,
            password : await hashPassword(password),
            name,
        },{
            new:true,
            runValidators : true,
        });

        res.status(200).json({
            status: 'success ✅',
            data : admin,
            message: "Admin's profile updated successfully.",
        });
    } else{
        // Update()
        const admin  = await Admin.findByIdAndUpdate(req.userAuth._id, {
            email,
            name,
        },{
            new:true,
            runValidators : true,
        });

        res.status(200).json({
            status: 'success ✅',
            data : admin,
            message: "Admin profile updated successfully.",
        });
    }
    
});


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

        });
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

//         });
//     }

// }
// module.exports = {
//     registerAdminCtrl,
// }