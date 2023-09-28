const mongoose = require('mongoose');

// create user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

// create user model
const User = mongoose.model('User', userSchema);

module.exports = User;