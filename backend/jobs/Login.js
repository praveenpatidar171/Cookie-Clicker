const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const loginUser = asyncHandler(async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide both email and password", success: false });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist, please sign up", success: false });
        }
        else {
            const compare = await bcrypt.compare(password, user.password);
            if (!compare) {
                return res.status(400).json({ message: "Incorrect credentials, please try again", success: false });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' })
                .json({
                    message: `welcome back ${user.name}`,
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    profilePhoto: user.profilePhoto,
                    totalClicks: user.totalClicks,
                    totalPoints: user.totalPoints,
                    prizesWon: user.prizeWonNumbers,
                    success: true,
                });
        }

    } catch (error) {
        console.error(`Error logging in user: ${error.message}`);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

});

module.exports = loginUser;