const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    official: Boolean,
    creator: String,
    createdDate: Date,
    name: String,
    description: String,
    imageSource: String,
    substanceID: Number,
    moodID: Number,
    trackList: [],
    hidden: Boolean,
});

module.exports = mongoose.model("Playlist", playlistSchema);