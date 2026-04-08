const express = require('express');
const router = express.Router();
const { getPersonalRecords } = require('../controllers/statsController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect); //only logged in users can access personal records

router.get('/prs', getPersonalRecords);

module.exports = router;

