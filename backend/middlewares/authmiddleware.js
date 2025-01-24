const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {

    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "NO token , Authentication failed" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(400).json({ message: "User not found, authentication failed" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Down" });
    }

})

module.exports = authMiddleware;