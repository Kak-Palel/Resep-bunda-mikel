const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controller/user');

router.post('/register', userController.registerUser);
router.post(`/login`, userController.loginUser);
router.get(`/profile/:name`, userController.getUserProfile);
router.get(`/profile_by_id/:id`, userController.getUserProfileById);
router.put(`/update`, passport.authenticate('jwt', {session: false}), userController.updateUserProfile);
router.put(`/change_password`, passport.authenticate('jwt', {session: false}), userController.changePassword);

module.exports = router;