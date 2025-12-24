const express = require('express');
const router = express.Router();

const userAuthController = require('../../Controller/User/auth/userAuthController');
const { SignupValidate, LoginValidate } = require('../../Middleware/auth_validation');
const checkJwtToken = require('../../Middleware/check_token');

// PUBLIC
router.post('/user/signup', SignupValidate, userAuthController.signup);
router.post('/user/login', LoginValidate, userAuthController.login);

// PROTECTED
router.post('/user/logout', checkJwtToken(["user"]), userAuthController.logout);
module.exports = router;
