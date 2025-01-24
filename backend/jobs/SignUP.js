const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const signup = asyncHandler(async (req, res) => {

    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please send all the fields", success: false });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "Email already used, please sign in", success: false });
        }
        else {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const profilePhoto = `https://api.dicebear.com/9.x/croodles/svg/seed=${email}`
            const newUser = {
                name, email, password: hashedPassword, profilePhoto
            }

            const user = await User.create(newUser);

            if (user) {
                return res.status(201).json({ message: 'User created Successfully', success: true });
            }
            else {
                return res.status(400).json({ message: "User not registered!!", success: false });
            }
        }

    } catch (error) {
        console.error(`Error during signup: ${error.message}`);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = signup;