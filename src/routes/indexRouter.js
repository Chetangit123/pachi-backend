const express = require('express')
const router = express.Router();

router.use('/auth/user', require('./userRouter'))

module.exports = router;