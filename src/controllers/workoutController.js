const Workout = require('../models/Workout');

// @desc Log a new workout
// @route POST /api/workouts

exports.logWorkout = async (req, res, next) => {

    try {

        //attach logged in user's data
        const workoutData = {
            ...req.body,
            user: req.user.id
        };

        const workout = await Workout.create(workoutData);

        res.status(201).json({
            success: true,
            data: workout
        })

    } catch (err) {
        next(err);
    }
};


// @desc Get my workout history
// @route GET /api/workouts/me
exports.getMyWork = async (req, res, next) => {

    try {

        const workouts = await Workout.find({ user: req.user.id })
            .populate('plan', 'name') //shows the plan name
            .sort('-date') //sort, show newest first


        res.status(201).json({
            success: true,
            count: workouts.length,
            data: workouts
        })

    } catch (err) {
        next(err)
    }
}