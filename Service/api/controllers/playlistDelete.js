const mongoose = require('mongoose');
const varcheck = require('../varcheck');

const playlistModel = require('../models/playlist');

exports.playlistDelete = async (req, res, next) => {
    //  Ensure we have a valid 'PlaylistID' value
    if (!varcheck.check("PlaylistID", "Number", req.body)) {  res.status(400).json({ error: "A valid 'PlaylistID' value must be provided" }); return; }

    res.status(200).json({  message: "api/Playlist/delete post request", });
}