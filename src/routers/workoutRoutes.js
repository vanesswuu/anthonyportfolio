const express = require('express');
const router = express.Router();
const { logWorkout, getMyWork } = require('../controllers/workoutController');

const { protect } = require('../middlewares/authMiddleware');

//all workout routes should be protected, needs login/use protect
router.use(protect);

router.post('/', logWorkout);
router.get('/me', getMyWork);

module.exports = router;