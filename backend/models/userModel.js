const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    profilePhoto: {
        type: String,
        default: "",
    },
    totalClicks: {
        type: Number,
        default: 0
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    prizeWonNumbers: {
        type: Number,
        default: 0
    },
},
    {
        timestamps: true,
    });

const User = mongoose.model('User', userSchema);


module.exports = User;