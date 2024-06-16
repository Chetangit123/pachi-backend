const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user.model');
const { failureResponse, notFound, catchError } = require('../utils/response');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;


const jwt = {
    assignJwt: (user) => {
        const payload = {
            _id: user._id,
            email: user.email
        };
        const options = {
            expiresIn: "1h",
        };
        const token = jsonwebtoken.sign(payload, SECRET_KEY, options);
        return token;
    },

    verifyUserToken: async (req, res, next) => {
        try {
            let token = req.headers.authorization;
            if (!token) {
                return failureResponse(res, false, 401, "Access Denied: Token not provided");
            }

            let decoded;
            try {
                decoded = jsonwebtoken.verify(token, SECRET_KEY);
            } catch (err) {
                if (err.name === "TokenExpiredError") {
                    return failureResponse(res, false, 401, "Session timeout: Please login again");
                }
                return failureResponse(res, false, 401, "Access Denied: Invalid Token");
            }

            if (!decoded) {
                return failureResponse(res, false, 401, "Access Denied: Invalid Token");
            }

            const user = await User.findById(decoded._id);
            if (!user) {
                return notFound(res, 'User')
            }

            req.user = user;
            next();
        } catch (error) {
            return catchError(res)
        }
    },
}

module.exports = jwt;
