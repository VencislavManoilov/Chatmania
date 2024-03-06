const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    email: String,
    password: String,
    age: Number
});

// Plugin Passport-Local Mongoose for authentication
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;