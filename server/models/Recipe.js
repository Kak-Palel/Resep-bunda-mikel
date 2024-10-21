const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: [String],
        required: true
    },
    timeToCreate:
    {
        type: Number,
        default: 0 //in seconds
    },
    difficulty:
    {
        type: Number,
        default: 0 //0 - easy; 1 - medium, 2 - hard
    },
    likes:
    {
        type: Number,
        default: 0
    },
    servings:
    {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        immutable: true
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;