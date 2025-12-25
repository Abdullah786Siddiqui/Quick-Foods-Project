const express = require('express');
const router = express.Router();

const restaurantAuthController = require('../../Controller/Restaurant/auth/restaurantAuthController');
const { SignupValidate, LoginValidate } = require('../../Middleware/auth_validation');
const checkJwtToken = require('../../Middleware/check_token');


// PUBLIC
router.post('/restaurant/signup', SignupValidate, restaurantAuthController.signup);
router.post('/restaurant/login', LoginValidate, restaurantAuthController.login);

// PROTECTED
router.post('/restaurant/logout', checkJwtToken(["restaurant"]), restaurantAuthController.logout);
module.exports = router;
