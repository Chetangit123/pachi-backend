const express = require("express");
const { controller } = require("../controllers/indexController");
const { userSignupSchema, userLoginSchema, editProgileSchema, changePasswordSchema, forgetPasswordSchema, resetPasswordSchema } = require("../validations/userValidation");
const validate = require('../validations/validate');
const { verifyUserToken } = require("../middlewares/jwtMiddleware");
const { changePassword } = require("../controllers/userController");
const { uploadProfile, uploadUserAvatar } = require("../utils/uploadImage");
const router = express.Router();

router.post('/create-user', controller.userController.createUser)
router.post('/login-user', validate(userLoginSchema), controller.userController.userLogin)
router.put('/verify-user', controller.userController.verifyUser)
router.get('/user-profile', verifyUserToken, controller.userController.userProfile)
router.put('/edit-user-profile', verifyUserToken, validate(editProgileSchema), controller.userController.editProfile)
router.put('/change-password', verifyUserToken, validate(changePasswordSchema), controller.userController.changePassword)
router.put('/forget-password', validate(forgetPasswordSchema), controller.userController.forgetPassword)
router.put('/reset-password', validate(resetPasswordSchema), controller.userController.resetPassword)
router.post('/upload-profile', uploadUserAvatar, controller.userController.uploadProfile)

module.exports = router;