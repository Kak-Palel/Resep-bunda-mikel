const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followers: {
        type: int,
        default: 0
    },
    following: {
        type: int,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;