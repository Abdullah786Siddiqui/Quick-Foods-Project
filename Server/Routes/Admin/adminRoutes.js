const express = require('express');
const router = express.Router();
const adminUserController = require('../../Controller/Admin/userController');
const adminRestaurantController = require('../../Controller/Admin/restaurantController');
const adminDeliveryController = require('../../Controller/Admin/deliveryPartnerController');
const adminMenuController = require('../../Controller/Admin/menuController');



const checkJwtToken = require('../../Middleware/check_token');


// GET ALL USERS- Admin only
router.get('/users', checkJwtToken(['admin']), adminUserController.fetchAllUsers);
// UPDATE SPECIFIC USER - Admin only
router.patch('/user/update/:id', checkJwtToken(['admin']), adminUserController.UpdateUser);
// GET ALL MAIN RESTAURANT - Admin only
router.get('/restaurants', checkJwtToken(['admin']), adminRestaurantController.fetchMainRestaurant);
// GET ALL BRANCHES OD MAIN RESTAURANT - Admin only
router.get('/restaurants/branches/:id', checkJwtToken(['admin']), adminRestaurantController.fetchAllBranchRestaurants);
// GET DETAIL SPECIFIC RESTAURANT - Admin only
router.get('/restaurants/details/:id', checkJwtToken(['admin']), adminRestaurantController.fetcRestaurantDetails);
// GET DELIVERY PARTNERS - Admin only
router.get('/deliveryRiders', checkJwtToken(['admin']), adminDeliveryController.fetchAllDeliveryPartners);
// GET CATEGORIES - Admin only
router.get('/categories', checkJwtToken(['admin']), adminMenuController.fetchAllCategory);




module.exports = router;
