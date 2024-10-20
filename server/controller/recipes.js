const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Recipe = require('../models/Recipe');

// Import necessary modules
//-

// Controller function to get all recipes
const getSomeRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().limit(req.params.amount);
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Server error' , message: error.message });
    }
};

// Controller function to create a new recipe
const createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, timeToCreate, difficulty, image} = req.body;

        // Validate input data
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ error: 'Missing required fields' });
            console.log('Missing required fields')
        }
        
        console.log(req)

        const newRecipe = new Recipe({ 
            title,
            ingredients,
            instructions,
            timeToCreate: timeToCreate ? timeToCreate : 0,
            difficulty: difficulty ? difficulty : 0,
            image : image ? image : "defaultImage",
            createdBy : req.user._id
        });
        await newRecipe.save();
        res.ok = true;
        res.status(201).json({message : 'Recipe created successfully'});
    } catch (error) {
        console.error('Error creating recipe:', error); // Log the error for debugging
        res.status(500).json({ error: 'Server error', message: error.message });
    }
};

// Controller function to get a single recipe by ID
const getRecipeById = async (req, res) => {
    try {
        // console.log('ID:', req.params.id);
        const recipe = await Recipe.findById(req.params.id);
        // console.log('Recipe:', recipe);
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
        const { title, ingredients, instructions } = req.body;
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        recipe.title = title;
        recipe.ingredients = ingredients;
        recipe.instructions = instructions;

        await recipe.save();

        res.status(200).json({ message: 'updating a recipe by ID route success'});
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to delete a recipe by ID
const deleteRecipeById = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json({ message: 'Recipe deleted successfully' });
        // res.json({ message: 'deleting a recipe by ID route success'});
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Export the controller functions
module.exports = {
    getSomeRecipes,
    createRecipe,
    getRecipeById,
    updateRecipeById,
    deleteRecipeById,
};