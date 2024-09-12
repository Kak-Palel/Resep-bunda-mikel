const express = require('express');
const router = express.Router();
const socialController = require('../controller/social')

router.post(`/like`, socialController.likeRecipe);
router.post(`/comment`, socialController.commentOnRecipe);
router.get(`/view_comments`, socialController.viewComments);
router.post(`/follow`, socialController.followUser);
router.get(`/view_followers`, socialController.viewFollowers);
router.get(`/view_following`, socialController.viewFollowing);

module.exports = router;