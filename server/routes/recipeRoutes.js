const express = require('express');
const router = express.Router();
const passport = require('passport');
const recipeController = require('../controller/recipes')

router.get(`/get_some/:amount`, recipeController.getSomeRecipes);
router.post(`/create`, passport.authenticate('jwt', {session: false}), recipeController.createRecipe);
router.get(`/get/:id`, recipeController.getRecipeById);
router.put(`/update/:id`, passport.authenticate('jwt', {session: false}), recipeController.updateRecipeById);
router.delete(`/delete/:id`, passport.authenticate('jwt', {session: false}), recipeController.deleteRecipeById);

module.exports = router;