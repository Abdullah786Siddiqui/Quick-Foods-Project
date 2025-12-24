const express = require('express')
const router = express.Router();
const userAuthController = require('../../Controller/User/auth/userAuthController');
const { SignupValidate, LoginValidate } = require('../../Middleware/auth_validation');
router.post('/user/signup', SignupValidate, userAuthController.signup);
router.post('/user/login', LoginValidate, userAuthController.login);
router.post('/user/logout', userAuthController.logout);
module.exports = router;