const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const varcheck = require("../varcheck");

const userModel = require("../models/user");
const playlistModel = require("../models/playlist");

exports.playlistCreate = async (req, res, next) => {
    //  Ensure we have a valid 'Name', 'Description', 'ImageSource', and 'TrackList' value
    if (!varcheck.check("Creator", "String", req.body)) {  res.status(400).json({ success: false, error: "A valid 'Creator' value must be provided" }); return; }
    if (!varcheck.check("Name", "String", req.body)) {  res.status(400).json({ success: false, error: "A valid 'Name' value must be provided" }); return; }
    if (!varcheck.check("Description", "String", req.body)) {  res.status(400).json({ success: false, error: "A valid 'Description' value must be provided" }); return; }
    if (!varcheck.check("ImageSource", "String", req.body)) {  res.status(400).json({ success: false, error: "A valid 'ImageSource' value must be provided" }); return; }
    if (!varcheck.check("TrackList", "Array", req.body)) {  res.status(400).json({ success: false, error: "A valid 'TrackList' value must be provided" }); return; }

    //  Find the creator's user
    let username = req.body.Creator.toLowerCase();
    let existingUser = await userModel.findOne({ username: username }).exec();
    if (!existingUser) { res.status(200).json({ success: false, message: "No user exists with that Creator username"}); return; }

    //  Check that the user is the user they specify as creator
    try { jwt.verify(req.body.token, process.env.JWT_KEY, { subject: username, expiresIn: "1d" }); }
    catch (error) { res.status(200).json({ success: false, message: "Playlist creator value incorrect", }); return; }

    //  If we've gotten this far, register the account into the database and return a success
    const playlistEntry = new playlistModel({
        _id: new mongoose.Types.ObjectId(),
        creator: req.body.Creator,
        name: req.body.Name,
        description: req.body.Description,
        imageSource: req.body.ImageSource,
        trackList: req.body.TrackList,
    });
    let result = await playlistEntry.save();
    
    if (result) { res.status(200).json({ success: true, message: "Playlist successfully created", }); }
    else { res.status(200).json({ success: true, message: "Failed to create Playlist: Unknown Error", }); }
}