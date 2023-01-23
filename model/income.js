const mongoose = require('mongoose');
    const contentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['income', 'expens']
    },
    amount: {
        type: Number,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    report: {type: String},
    date: {
        type: Date,
        required: true
    }
},{timestamps: true});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contents: [contentSchema]
});


const User = mongoose.model('User', userSchema);
module.exports = User;