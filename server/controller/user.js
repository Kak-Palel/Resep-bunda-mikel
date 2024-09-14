const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

require('dotenv').config();
const jwtkey = process.env.JWT_KEY;

const registerUser = (req, res) => {
    // Implement registration logic here
    res.json({ message: "Registration successful!" });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, username: user.username };
                        const token = jwt.sign(payload, jwtkey, { expiresIn: '1h' });

                        res.json({ success: true, token: `Bearer ${token}` });
                    } else {
                        res.status(400).json({ message: 'Password incorrect' });
                    }
                });
        })
        .catch(err => console.error(err));
    };

const getUserProfile = (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => console.error(err));
};

const updateUserProfile = (req, res) => {
    const { username, email } = req.body;

    User.findByIdAndUpdate(req.user.id, { username, email }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => console.error(err));
};

const changePassword = (req, res) => {
    const { currentPassword, newPassword } = req.body;

    User.findById(req.user.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            bcrypt.compare(currentPassword, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newPassword, salt, (err, hash) => {
                                if (err) throw err;
                                user.password = hash;
                                user.save()
                                    .then(updatedUser => {
                                        res.json({ message: 'Password changed successfully' });
                                    })
                                    .catch(err => console.error(err));
                            });
                        });
                    } else {
                        res.status(400).json({ message: 'Current password incorrect' });
                    }
                });
        })
        .catch(err => console.error(err));
};

const resetPassword = (req, res) => {
    const { email } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Generate a password reset token
            const resetToken = jwt.sign({ id: user.id }, jwtkey, { expiresIn: '15m' });

            // Send the password reset token to the user's email
            // You can use a library like nodemailer to send the email
            // Example: nodemailer.sendMail({ to: user.email, subject: 'Password Reset', text: `Reset token: ${resetToken}` });

            res.json({ message: 'Password reset token sent to your email' });
        })
        .catch(err => console.error(err));
};

const logout = (req, res) => {
    // Implement logout logic here
    res.json({ message: "Logout successful!" });
};

// Export the controller functions
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    changePassword,
    resetPassword,
    logout
};