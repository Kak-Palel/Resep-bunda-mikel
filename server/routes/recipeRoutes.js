const express = require('express');
const router = express.Router();
const recipeController = require('../controller/recipes')

router.get(`/get_some/:amount`, recipeController.getSomeRecipes);
router.post(`/create`, recipeController.createRecipe);
router.get(`/get/:id`, recipeController.getRecipeById);
router.put(`/update/:id`, recipeController.updateRecipeById);
router.delete(`/delete/:id`, recipeController.deleteRecipeById);

module.exports = router;