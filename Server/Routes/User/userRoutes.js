const express = require('express')
const router = express.Router();
const userController = require('../../Controller/User/userController');
const checkJwtToken = require('../../Middleware/check_token');

// GET current user info
router.get('/me', checkJwtToken, userController.me);

module.exports = router;