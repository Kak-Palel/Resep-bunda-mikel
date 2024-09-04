const express = require('express');
const user = require('./controller/user');
const recipes = require('./controller/recipes');
const social = require('./controller/social');
const cors = require('cors');


const app = express();
const PORT = 8080;

const API_URL = '/api';

corsOptions = {
    origin: ['http://localhost:5173'],
};

// Middleware
app.use(cors(corsOptions)); 

// Routes
app.get('/api', (req, res) => {
    res.send('Welcome to the Recipe Sharing Platform API!');
});

//user management
app.post(`${API_URL}/user/register`, user.registerUser);
app.post(`${API_URL}/user/login`, user.loginUser);
app.get(`${API_URL}/user/profile`, user.getUserProfile);
app.put(`${API_URL}/user/update`, user.updateUserProfile);
app.put(`${API_URL}/user/change_password`, user.changePassword);
app.put(`${API_URL}/user/reset_password`, user.resetPassword);
app.post(`${API_URL}/user/logout`, user.logout);

//Recipe Management
app.get(`${API_URL}/recipes/get_some`, recipes.getAllRecipes);
app.post(`${API_URL}/recipes/create`, recipes.createRecipe);
app.get(`${API_URL}/recipes/get`, recipes.getRecipeById);
app.put(`${API_URL}/recipes/update`, recipes.updateRecipeById);
app.delete(`${API_URL}/recipes/delete`, recipes.deleteRecipeById);

//Interaction and Social Features
app.post(`${API_URL}/social/like`, social.likeRecipe);
app.post(`${API_URL}/social/comment`, social.commentOnRecipe);
app.get(`${API_URL}/social/view_comments`, social.viewComments);
app.post(`${API_URL}/social/follow`, social.followUser);
app.get(`${API_URL}/social/view_followers`, social.viewFollowers);
app.get(`${API_URL}/social/view_following`, social.viewFollowing);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});