const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.post('/register', userController.registerUser);
router.post(`/login`, userController.loginUser);
router.get(`/profile`, userController.getUserProfile);
router.put(`/update`, userController.updateUserProfile);
router.put(`/change_password`, userController.changePassword);
router.put(`/reset_password`, userController.resetPassword);
router.post(`/logout`, userController.logout);

module.exports = router;