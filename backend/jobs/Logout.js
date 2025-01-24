const asyncHandler = require('express-async-handler');
const logOut = asyncHandler(async (req, res) => {

    try {
        return res.status(200).cookie('token', '', { maxAge: 0 }).json({ message: 'User logged out successfully', success: true });
    } catch (error) {
        console.error(`Error logging out user: ${error.message}`);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = logOut;