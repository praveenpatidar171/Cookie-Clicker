const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const getStats = asyncHandler(async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false })
        }
        return res.status(200).json({ user, success: true });


    } catch (error) {
        console.error(`Error fetching user stats: ${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });

    }
})

module.exports = getStats;