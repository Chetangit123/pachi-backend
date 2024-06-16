const { catchError, successResponse, swrResponse, failureResponse, notFound } = require("../utils/response");
const bcrypt = require('bcrypt');
const User = require("../models/user.model");
const generateOTP = require("../utils/helpers");
const { genericMail } = require("../utils/sendMail");
const { assignJwt } = require("../middlewares/jwtMiddleware");

module.exports.createUser = async (req, res) => {
    let { name, email, password, mobile } = req.body
    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return successResponse(
                res,
                false,
                409,
                `User with email ${email} already exists.`,
                null
            );
        }
        const otp = generateOTP()
        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            mobile,
            otp
        });
        delete (newUser.hashedPassword)
        const user = await newUser.save();
        if (!user) {
            return swrResponse(res)
        }

        genericMail(email, name, otp)

        return successResponse(res, true, 201, "User Created Successfully and OTP has been sent to your registered email address")

    } catch (error) {
        return catchError(res, error)
    }
}

module.exports.verifyUser = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return failureResponse(res, false, 404, "Email address does not exists")
        }
        if (otp != user.otp) {
            return failureResponse(res, false, 401, "Invalid OTP")
        }
        user.isVerified = true
        user.save();
        return successResponse(res, true, 200, "User Verified Successfully")
    } catch (error) {
        return catchError(res, error)
    }
}

module.exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return failureResponse(res, false, 401, 'Invalid Email or Password')
        }

        let result = await bcrypt.compare(password, user.password)
        if (!result) {
            return failureResponse(res, false, 401, 'Invalid Email or Password')
        }

        if (!user.isVerified) {
            return failureResponse(res, false, 401, 'Please verify your email first')
        }


        const payload = {
            _id: user._id,
            email: user.email
        }

        let token = assignJwt(payload)
        let userObject = new Object({
            name: user.name, email: user.email, mobile: user.mobile, token: token
        })

        return successResponse(res, true, 200, "User Logged in successfully.", userObject)

    } catch (error) {
        return catchError(res, error)
    }
}

module.exports.userProfile = async (req, res) => {
    try {
        let userId = req.user._id
        let user = await User.findById(userId)
        if (!user) {
            return notFound(res, 'User')
        }

        const userObject = new Object({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            createdAt: user.createdAt
        })
        return successResponse(res, true, 200, "User Details", userObject)
    } catch (error) {
        return catchError(res, error)
    }
}

module.exports.editProfile = async (req, res) => {
    try {
        const { name, mobile } = req.body;
        let userId = req.user._id;
        let user = await User.findByIdAndUpdate(userId, { name, mobile }, { new: true });
        if (!user) {
            return notFound(res, 'User')
        }
        const userObject = new Object({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile
        })
        return successResponse(res, true, 200, "Profile updated successfully", userObject)
    } catch (error) {
        return catchError(res, error);
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        let userId = req.user._id;
        const { oldPassword, newPassword } = req.body;
        let user = await User.findById(userId);
        if (!user) {
            return failureResponse(res, false, 401, "User Not Found")
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return failureResponse(res, false, 401, "Old password is incorrect")
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return successResponse(res, true, 200, "Password changed successfully")
    } catch (error) {
        return catchError(res, error);
    }
}

module.exports.forgetPassword = async (req, res) => {

}