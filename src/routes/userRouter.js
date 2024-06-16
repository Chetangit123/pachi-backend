const express = require("express");
const { controller } = require("../controllers/indexController");
const { userSignupSchema, userLoginSchema, editProgileSchema, changePasswordSchema } = require("../validations/userValidation");
const validate = require('../validations/validate');
const { verifyUserToken } = require("../middlewares/jwtMiddleware");
const { changePassword } = require("../controllers/userController");
const router = express.Router();

router.post('/create-user', validate(userSignupSchema), controller.userController.createUser)
router.post('/login-user', validate(userLoginSchema), controller.userController.userLogin)
router.put('/verify-user', controller.userController.verifyUser)
router.get('/user-profile', verifyUserToken, controller.userController.userProfile)
router.put('/edit-user-profile', verifyUserToken, validate(editProgileSchema), controller.userController.editProfile)
router.put('/change-password', verifyUserToken, validate(changePasswordSchema), controller.userController.changePassword)

module.exports = router;