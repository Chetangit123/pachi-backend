
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please use a valid mobile number.']
    },
    otp: {
        type: Number,
        required: true
    },
    forgetPassOtp: {
        type: Number
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
