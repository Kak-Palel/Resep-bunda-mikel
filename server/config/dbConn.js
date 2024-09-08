const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connect to the MongoDB database
        await mongoose.connect('mongodb://localhost:27017/mydatabase', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
module.exports = connectDB;