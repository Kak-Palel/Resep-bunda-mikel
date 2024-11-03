// const Recipe = require('../models/Recipe');
// const User = require('../models/User');
// const Comment = require('../models/Comment');

// Import necessary modules and models

// Like Recipe
const likeRecipe = async (req, res) => {
    try {
        const { recipe_id } = req.body;
        const recipe = await Recipe.findById(recipe_id);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        recipe.likes += 1;
        await recipe.save();
        req.user.likedRecipes.push(recipe_id);
        await req.user.save();

        res.status(200).json({ message: 'Recipe liked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Comment on Recipe
const commentOnRecipe = async (req, res) => {
    try {
        const { recipe_id, comment } = req.body;
        const recipe = await Recipe.findById(recipe_id);
        recipe.comments.push({ comment, user: req.user._idm, username: req.user.username });
        await recipe.save();

        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// View Comments
const viewComments = async (req, res) => {
    try {
        const { recipe_id } = req.params;
        const recipe = await Recipe.findById(recipe_id);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        const comments = await Comment.find({ recipe: recipe_id });

        res.status(200).json({ comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Follow User
const followUser = async (req, res) => {
    try {
        const { user_id } = req.body;
        const follower = await User.findById(req.user._id);

        if (!follower) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.user.following.push(user_id);
        await req.user.save();

        const followed = await User.findById(user_id);
        if (!followed) {
            return res.status(404).json({ error: 'User not found' });
        }
        follower.followers.push(req.user._id);
        await follower.save();

        res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// View Followers
const viewFollowers = async (req, res) => {
    try {
        res.status(200).json(req.user.followers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// View Following
const viewFollowing = async (req, res) => {
    try {
        res.status(200).json(req.user.following);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    likeRecipe,
    commentOnRecipe,
    viewComments,
    followUser,
    viewFollowers,
    viewFollowing,
};