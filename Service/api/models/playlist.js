const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    creator: String,
    name: String,
    description: String,
    imageSource: String,
    trackList: [],
});

module.exports = mongoose.model("Playlist", playlistSchema);