const mongoose = require('mongoose');

//defined schema of mongoDB object
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailID: {
        type: String,
        required: true
    },
    watchlist: {
        type: Array,
        required: false
    }
});

const User = module.exports = mongoose.model('User', UserSchema);
