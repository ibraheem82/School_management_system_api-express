// ** checking if a user is logged in or not.
const isLogin = (req, res, next)=> {
    const isLogin = req.userAuth; // this is getting the already authenticated user. from the user in the adminController.
    if(isLogin){
        next()
    } else{
        const err = new Error('You are not login')
        next(err);
    }
};

module.exports = isLogin;