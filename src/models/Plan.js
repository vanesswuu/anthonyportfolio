const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a plan name'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'please add a description']
    },
    price: {
        type: Number,
        required: [true, 'please add a price']
    },
    durationInMonths: {
        type: Number,
        default: 1
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Plan', planSchema);