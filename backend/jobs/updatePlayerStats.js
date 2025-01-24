const asyncHandler = require('express-async-handler');
const calculatePoints = require('./calculatePoints');
const User = require('../models/userModel');

const updateStats = asyncHandler(async (req, res) => {

    try {
        const { points, wonPrize } = calculatePoints();

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        //updating the userStats

        user.totalClicks += 1                       //increse one click
        user.totalPoints += points;                 //increse the total score
        if (wonPrize) {
            // increase the prizewon numbers
            user.prizeWonNumbers += 1;
        };

        // saving the updated values
        await user.save();

        return res.status(200).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            totalClicks: user.totalClicks,
            totalPoints: user.totalPoints,
            prizesWon: user.prizeWonNumbers,
            profilePhoto: user.profilePhoto
        })

    } catch (error) {
        console.error(`Error updating stats: ${error.message}`);
        return res.status(500).json({ message: 'Internal Server Down' })
    }
})

module.exports = updateStats;