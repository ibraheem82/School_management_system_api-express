const Teacher = require("../model/Staff/Teacher");
const verifyToken = require("../utils/verifyToken");
// ** checking if a user is logged in or not.
const isTeacherLogin = async (req, res, next)=> {
    // get token from header
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
    const verifiedToken = verifyToken(token);
    if (verifiedToken){
       
        const user = await Teacher.findById(
            verifiedToken.id
        ).select('name email role');
        // save the user into the req.obj
        
        req.userAuth = user;
        next();
    } else{
        const err = new Error('Token expired/invalid');
        next(err);
    }

};

module.exports = isTeacherLogin;