const bcrypt = require("bcryptjs");
// salting
        // ** Hash Password.
exports.hashPassword = async password => {
const salt  = await bcrypt.genSalt(13);
const hash = await bcrypt.hash(password, salt)
return hash;
}


// ** Verify Password ()
exports.isPassMatched = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}