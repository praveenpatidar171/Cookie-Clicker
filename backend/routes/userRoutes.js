const express = require('express');
const loginUser = require('../jobs/Login');
const signup = require('../jobs/SignUP');
const authMiddleware = require('../middlewares/authmiddleware');
const logOut = require('../jobs/Logout');
const getStats = require('../jobs/getPlayerStats');
const updateStats = require('../jobs/updatePlayerStats');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', signup);
router.get('/logout', authMiddleware, logOut);
router.get('/', authMiddleware, getStats);
router.put('/updateStat', authMiddleware, updateStats);

module.exports = router;