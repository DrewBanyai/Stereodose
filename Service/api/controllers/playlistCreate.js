const mongoose = require('mongoose');
const varcheck = require('../varcheck');

const playlistModel = require('../models/playlist');

exports.playlistCreate = async (req, res, next) => {
    //  Ensure we have a valid 'Name', 'Description', 'ImageSource', and 'TrackList' value
    if (!varcheck.check("Name", "String", req.body)) {  res.status(400).json({ error: "A valid 'Name' value must be provided" }); return; }
    if (!varcheck.check("Description", "String", req.body)) {  res.status(400).json({ error: "A valid 'Description' value must be provided" }); return; }
    if (!varcheck.check("ImageSource", "String", req.body)) {  res.status(400).json({ error: "A valid 'ImageSource' value must be provided" }); return; }
    if (!varcheck.check("TrackList", "Array", req.body)) {  res.status(400).json({ error: "A valid 'TrackList' value must be provided" }); return; }
    
    //  If we've gotten this far, register the account into the database and return a success
    const playlistEntry = new playlistModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.Name,
        description: req.body.Description,
        imageSource: req.body.ImageSource,
        trackList: req.body.TrackList,
    });
    let result = await playlistEntry.save();

    res.status(200).json({ success: true, message: "Playlist successfully created", });
}