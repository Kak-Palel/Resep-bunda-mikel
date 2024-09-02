const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;
corsOptions = {
    origin: ['http://localhost:5173'],
};

// Middleware
app.use(cors(corsOptions)); 

// Routes
app.get('/api', (req, res) => {
    res.send('Welcome to the Recipe Sharing Platform API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});