const verifyToken = require("../utils/verifyToken");

// ** checking if a user is logged in or not.
const isLogin = (req, res, next)=> {
    // get token from header
    const headerObj = req.headers;
    const token = headerObj.authorization.split(" ")[1];
    const verifiedToken = verifyToken(token); // verify the token that is coming from the header.

    if (verifiedToken){
        // save the user into the req.obj
        req.userAuth = verifiedToken;
        next();
    } else{
        const err = new Error('Token expired/invalid');
        next(err);
    }

};

module.exports = isLogin;