const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true, },
    password: { type: String, required: true },
    signupDate: Date,
    favoritePlaylists: [],
    favoriteTracks: [],
});

module.exports = mongoose.model("User", userSchema);