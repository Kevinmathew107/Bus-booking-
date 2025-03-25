const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);

router.post('/login', userController.login);
router.post('/travellerlogin', userController.loginAdmin);
router.post('/userbookings', userController.getUserBookings);

router.post('/recentbookings', userController.getAllBookings);

module.exports = router;