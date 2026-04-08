const Plan = require('../models/Plan');


// @desc get all plans (public - anyone can see prices)
// @route /api/plans

exports.getPlans = async (req, res, next) => {

    try {

        //1. --filtering--

        let queryStr = JSON.stringify(req.query);

        // Replace (gt, gte, lt, lte, in) with ($gt, $gte, etc) for MongoDB
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        const queryObj = JSON.parse(queryStr);

        let query = Plan.find(queryObj);

        //2. --pagination--
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit; //for pages, for the system to know how many
        //docs to skip to get to the next list/page
        query = query.skip(skip).limit(limit);

        const plans = await query;

        res.status(200).json({
            success: true,
            count: plans.length,
            pagination: { page, limit },
            data: plans
        })

    } catch (error) {
        next(error);
    }
}


// @desc create a plan
// @route /api/plans

exports.createPlan = async (req, res, next) => {

    try {

        const plan = await Plan.create(req.body);

        res.status(201).json({
            success: true,
            message: 'plan created'
        })


    } catch (error) {
        next(error);
    }


}

exports.deletePlan = async (req, res, next) => {

    try {

        const plan = await Plan.findByIdAndDelete(req.params.id);

        if (!plan) {
            return res.status(404).json({
                success: false,
                message: 'plan not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'plan deleted',
            data: {}
        })


    } catch (error) {
        next(error);
    }

}


