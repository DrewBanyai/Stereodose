const mongoose = require('mongoose');
const varcheck = require('../varcheck');

const playlistModel = require('../models/playlist');

exports.playlistCreate = async (req, res, next) => {
    //  Ensure we have a valid 'Name', 'Description', 'ImageSource', and 'TrackList' value
    if (!varcheck.check("Name", "String", req.body)) {  res.status(400).json({ error: "A valid 'Name' value must be provided" }); return; }
    if (!varcheck.check("Description", "String", req.body)) {  res.status(400).json({ error: "A valid 'Description' value must be provided" }); return; }
    if (!varcheck.check("ImageSource", "String", req.body)) {  res.status(400).json({ error: "A valid 'ImageSource' value must be provided" }); return; }
    if (!varcheck.check("TrackList", "Array", req.body)) {  res.status(400).json({ error: "A valid 'TrackList' value must be provided" }); return; }
    
    //  TODO:  Handle the Playlist data values and attempt to create one in the database, and return the result
    res.status(200).json({ message: "/playlist/create post request", });
}