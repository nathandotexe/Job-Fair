const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// AUTH ROUTES
router.post('/register', register);
router.post('/login', login);

// OTHER ROUTES
router.use('/users', require('./users'));
router.use('/jobs', require('./jobs'));
router.use('/applications', require('./applications'));

module.exports = router;
