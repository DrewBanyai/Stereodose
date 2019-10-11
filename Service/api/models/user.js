const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    signupDate: Date,
    favoritePlaylists: [],
    favoriteTracks: [],
});

module.exports = mongoose.model("User", userSchema);