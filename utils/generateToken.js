const jwt = require("jsonwebtoken");

// -> Responsible for generating tokens for users.
const generateToken = (id) =>{ // passing in the (id) of the user
    return jwt.sign({id}, process.env.jwt_salt, {expiresIn:'12d'});
}

module.exports = generateToken;