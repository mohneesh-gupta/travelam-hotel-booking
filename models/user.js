const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
    // username and password will be added by passport-local-mongoose automatically
});

UserSchema.plugin(passportLocalMongoose); // adds username, hash and salt fields

module.exports = mongoose.model('User', UserSchema);