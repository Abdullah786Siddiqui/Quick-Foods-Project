const express = require('express');
const router = express.Router();
const adminUserController = require('../../Controller/Admin/userController');
const checkJwtToken = require('../../Middleware/check_token');


// Get all users - Admin only
router.get('/users', checkJwtToken(['admin']), adminUserController.fetchAllUsers);
router.patch('/user/update/:id', checkJwtToken(['admin']), adminUserController.UpdateUser);



module.exports = router;
