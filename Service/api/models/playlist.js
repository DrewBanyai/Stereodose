const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    imageSource: String,
    playlist: [],
});

module.exports = mongoose.model("Playlist", playlistSchema);