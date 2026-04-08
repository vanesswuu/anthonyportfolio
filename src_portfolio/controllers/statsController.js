const Workout = require('../models/Workout');

exports.getPersonalRecords = async (req, res, next) => {
    try {

        const prs = await Workout.aggregate([
            { $match: { user: req.user._id } }, //the current user
            { $unwind: '$exercises' }, //flatten the exercise array
            {
                $group: {
                    _id: '$exercises.name', //group by exercises name
                    maxWeight: { $max: '$exercises.weight' } //find max weight
                }
            },
            { $sort: { _id: 1 } } //sort a-z
        ]);
        res.status(200).json({
            success: true,
            data: prs
        });



    } catch (err) {
        next(err)
    }
}