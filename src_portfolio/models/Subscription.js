const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        ref: 'Plan',
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active' , 'expired' , 'cancelled'],
        default: 'active'
    }
})

module.exports = mongoose.model('Subscription', subscriptionSchema);