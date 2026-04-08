const express = require('express');
const router = express.Router();

const {subscribe, getMySub} = require('../controllers/subscriptionController');
const {protect} = require('../middlewares/authMiddleware');

//protect all routes
router.use(protect);

router.post('/', subscribe);
router.get('/me', getMySub);    //we can get a user's sub because of protect
// because of the token  //data ownership is sooo cooool!



module.exports = router;
