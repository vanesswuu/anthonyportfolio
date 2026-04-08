//  USER SCHEMA

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a name']
    },
    email: {
        type: String,
        required: [true, 'please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false     //set select to false, for security purposes
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['member', 'admin'],
        default: 'member'
    },
    progressPhotos: [{
        type: String
    }] //to store the user's progress photos, add this. this is a part of data ownership

})





//password hashing pre save hook
userSchema.pre('save', async function (next) {

    //only run this if password is modified
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);


});

//generate tokens
userSchema.methods.getToken = async function () {

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })

}

//for login, to check if password matches
userSchema.methods.isMatch = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);

}


module.exports = mongoose.model('User', userSchema);