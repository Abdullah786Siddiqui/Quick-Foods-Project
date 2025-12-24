const express = require('express');
const router = express.Router();

const adminAuthController = require('../../Controller/Admin/auth/adminAuthController');
const { SignupValidate, LoginValidate } = require('../../Middleware/auth_validation');
const checkJwtToken = require('../../Middleware/check_token');


// PUBLIC
router.post('/admin/signup', SignupValidate, adminAuthController.signup);
router.post('/admin/login', LoginValidate, adminAuthController.login);

// PROTECTED
router.post('/admin/logout', checkJwtToken(["admin"]), adminAuthController.logout);
module.exports = router;
