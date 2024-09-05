const Recipe = require('../models/Recipe');

// Import necessary modules
//-

// Controller function to get all recipes
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        const randomRecipes = recipes.sort(() => Math.random() - 0.5).slice(0, 3);
        res.json(randomRecipes);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to create a new recipe
const createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, id } = req.body;
        
        // Validate input data
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newRecipe = new Recipe({ title, ingredients, instructions, id });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error('Error creating recipe:', error); // Log the error for debugging
        res.status(500).json({ error: 'Server error', message: error.message });
    }
};

// Controller function to get a single recipe by ID
const getRecipeById = async (req, res) => {
    try {
        console.log('ID:', req.params.id);
        const recipe = await Recipe.findById(req.params.id);
        console.log('Recipe:', recipe);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json(recipe);
        // res.json({ message: 'getting a single recipe by ID route success'});
    } catch (error) {
        res.status(500).json({ error: 'Server error', message: error.message });
    }
};

// Controller function to update a recipe by ID
const updateRecipeById = async (req, res) => {
    try {
        // const { title, ingredients, instructions } = req.body;
        // const updatedRecipe = await Recipe.findByIdAndUpdate(
        //     req.params.id,
        //     { title, ingredients, instructions },
        //     { new: true }
        // );
        // if (!updatedRecipe) {
        //     return res.status(404).json({ error: 'Recipe not found' });
        // }
        // res.json(updatedRecipe);
        res.json({ message: 'updating a recipe by ID route success'});
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to delete a recipe by ID
const deleteRecipeById = async (req, res) => {
    try {
        // const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        // if (!deletedRecipe) {
        //     return res.status(404).json({ error: 'Recipe not found' });
        // }
        // res.json({ message: 'Recipe deleted successfully' });
        res.json({ message: 'deleting a recipe by ID route success'});
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Export the controller functions
module.exports = {
    getAllRecipes,
    createRecipe,
    getRecipeById,
    updateRecipeById,
    deleteRecipeById,
};