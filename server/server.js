const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const connectDB = require('./config/dbConn');

const userRouter = require('./routes/userRoutes');
const recipesRouter = require('./routes/recipeRoutes');
const socialRouter = require('./routes/socialRoutes');


connectDB();

const app = express();
const PORT = 8080;

const API_URL = '/api';

corsOptions = {
    origin: ['http://localhost:5173'],
};

// Middleware
app.use(cors(corsOptions)); 
app.use(express.json());

// Routes
app.get('/api', (req, res) => {
    res.send('Welcome to the Recipe Sharing Platform API!');
});

app.use(`${API_URL}/user`, userRouter);         // User Management
app.use(`${API_URL}/recipes`, recipesRouter);   // Recipe Management
app.use(`${API_URL}/social`, socialRouter);//Interaction and Social Features

// Start the server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});