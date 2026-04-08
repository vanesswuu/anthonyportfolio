const express = require('express');
const router = express.Router();

const { getPlans, createPlan, deletePlan } = require('../controllers/planController');
const { protect, authorize } = require('../middlewares/authMiddleware');

//public: anyone can see the plans
router.get('/', getPlans);



//admin only: requires login and admin role
router.post('/', protect, authorize('admin'), createPlan);
router.delete('/:id', protect, authorize('admin'), deletePlan);

module.exports = router;