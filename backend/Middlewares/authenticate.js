const APIError = require("./../utils/APIError");
const User = require("./../models/userModel");
const util = require("util");
const jwt = require("jsonwebtoken");
const jwtVerify = util.promisify(jwt.verify);

const authentication = async (req, res, next) => {
    // check existence of token
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return next(new APIError("Unauthorized", 401));
    }
    const token = bearerToken.split(" ")[1];

    // verify and decrypt the jwt token
    const decodedData = await jwtVerify(token, process.env.JWT_SECRET);

    // check exitence of user
    const user = await User.findOne({ _id: decodedData.id });
    if (!user) {
       return next(new APIError("Unauthorized", 401));
    }
    // assign user object to request object
    req.user = user;

    next();
};

// Export
module.exports = authentication;