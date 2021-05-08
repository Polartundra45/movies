const mongoose = require('mongoose');
const passPortLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
    }
})

userSchema.plugin(passPortLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;