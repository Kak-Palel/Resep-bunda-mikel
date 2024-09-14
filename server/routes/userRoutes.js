const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controller/user');

router.post('/register', userController.registerUser);
router.post(`/login`, userController.loginUser);
router.get(`/profile`, userController.getUserProfile);
router.put(`/update`, passport.authenticate('jwt', {session: false}), userController.updateUserProfile);
router.put(`/change_password`, passport.authenticate('jwt', {session: false}), userController.changePassword);
router.put(`/reset_password`, passport.authenticate('jwt', {session: false}), userController.resetPassword);
router.post(`/logout`, passport.authenticate('jwt', {session: false}), userController.logout);

module.exports = router;