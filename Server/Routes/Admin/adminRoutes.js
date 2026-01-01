const express = require('express');
const router = express.Router();
const adminUserController = require('../../Controller/Admin/userController');
const adminRestaurantController = require('../../Controller/Admin/restaurantController');

const checkJwtToken = require('../../Middleware/check_token');


// Get all users - Admin only
router.get('/users', checkJwtToken(['admin']), adminUserController.fetchAllUsers);
router.patch('/user/update/:id', checkJwtToken(['admin']), adminUserController.UpdateUser);
router.get('/restaurants', checkJwtToken(['admin']), adminRestaurantController.fetchMainRestaurant);
router.get('/restaurants/branches/:id', checkJwtToken(['admin']), adminRestaurantController.fetchAllBranchRestaurants);
router.get('/restaurants/details/:id', checkJwtToken(['admin']), adminRestaurantController.fetcRestaurantDetails);




module.exports = router;
