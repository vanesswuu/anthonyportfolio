const express = require('express');
const router = express.Router();

const { register , login, getMe} = require('../controllers/authController');
const {protect} = require('../middlewares/authMiddleware');

//define routes/paths
router.post('/register', register);
router.post('/login', login);


//get
router.get('/me', protect, getMe);







module.exports = router;