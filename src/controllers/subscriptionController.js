const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');

//@desc subscribe to as plan
//@route POST /api/subscriptions

exports.subscribe = async (req, res, next) => {

    try{
        
        const existingSub = await Subscription.findOne({user: req.user.id, status: 'active'});
        if(existingSub){
            return res.status(400).json({
                success: false,
                message: 'you already have an active membership'
            })
        }

        const {planId} = req.body;

        const plan = await Plan.findById(planId);
        if(!plan){
            return res.status(404).json({
                success: false,
                message: 'plan not found'
            })
        }

        const endDate = new Date(); 
        endDate.setMonth(endDate.getMonth() + plan.durationInMonths);

        const subscription = await Subscription.create({
            user: req.user.id,   //req.user is from protect
            plan: planId,
            endDate: endDate
        })

        res.status(200).json({
            success: true,
            message: `user ${req.user.name} subscribed`
        });

    } catch(error){
        next(error) //pass to global error handler
    }
}


// @desc get my current subscription
// @route GET /api/subscriptions/me

exports.getMySub = async (req, res, next) => {

    try{

        //stores the subscription details
        const subscription = await Subscription.findOne({user: req.user.id}).populate('plan');

        if(!subscription){
          return res.status(404).json({
                success: false,
                message: 'no active subscription'
            })
        }

        res.status(200).json({
            success: true,
            data: subscription
        })

    } catch(error){
        next(error);
    }


}

