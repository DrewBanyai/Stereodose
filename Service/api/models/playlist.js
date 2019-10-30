const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    creator: String,
    createdDate: Date,
    name: String,
    description: String,
    imageSource: String,
    substance: Number,
    mood: Number,
    trackList: [],
    hidden: Boolean,
});

module.exports = mongoose.model("Playlist", playlistSchema);