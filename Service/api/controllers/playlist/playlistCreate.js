const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const varcheck = require("../../varcheck");

const checkAuth = require("../../middleware/checkAuth");

const userModel = require("../../models/user");
const playlistModel = require("../../models/playlist");

exports.playlistCreate = async (req, res, next) => {
    //  Ensure we have a valid 'Name', 'Description', 'ImageSource', and 'TrackList' value
    if (!varcheck.check("Official", "Boolean", req.body)) {  res.status(400).json({ success: false, message: "A valid 'Official' value must be provided" }); return; }
    if (!varcheck.check("Creator", "String", req.body)) {  res.status(400).json({ success: false, message: "A valid 'Creator' value must be provided" }); return; }
    if (!varcheck.check("Name", "String", req.body)) {  res.status(400).json({ success: false, message: "A valid 'Name' value must be provided" }); return; }
    if (!varcheck.check("Description", "String", req.body)) {  res.status(400).json({ success: false, message: "A valid 'Description' value must be provided" }); return; }
    if (!varcheck.check("ImageSource", "String", req.body)) {  res.status(400).json({ success: false, message: "A valid 'ImageSource' value must be provided" }); return; }
    if (!varcheck.check("TrackList", "Array", req.body)) {  res.status(400).json({ success: false, message: "A valid 'TrackList' value must be provided" }); return; }
    if (!varcheck.check("Hidden", "Boolean", req.body)) {  res.status(400).json({ success: false, message: "A valid 'Hidden' value must be provided" }); return; }
    if (!varcheck.check("SubstanceID", "Number", req.body)) {  res.status(400).json({ success: false, message: "A valid 'Substance' value must be provided" }); return; }
    if (!varcheck.check("MoodID", "Number", req.body)) {  res.status(400).json({ success: false, message: "A valid 'Mood' value must be provided" }); return; }

    //  Find the creator's user
    let username = req.body.Creator.toLowerCase();
    let existingUser = await userModel.findOne({ username: username }).exec();
    if (!existingUser) { res.status(200).json({ success: false, message: "No user exists with that Creator username"}); return; }

    //  Check that the user is the user they specify as creator
    if (!checkAuth.authCheck(username, req.body.token)) { res.status(400).json({ error: "Invalid token provided" }); return; }
    //try { jwt.verify(req.body.token, process.env.JWT_KEY, { subject: username, expiresIn: "1d" }); }
    //catch (error) { res.status(200).json({ success: false, message: "Playlist creator value incorrect", }); return; }

    //  If we've gotten this far, register the account into the database and return a success
    const playlistEntry = new playlistModel({
        _id: new mongoose.Types.ObjectId(),
        official: req.body.Official,
        creator: req.body.Creator,
        createdDate: (new Date()),
        name: req.body.Name,
        description: req.body.Description,
        imageSource: req.body.ImageSource,
        trackList: req.body.TrackList,
        hidden: req.body.Hidden,
        substanceID: req.body.SubstanceID,
        moodID: req.body.MoodID,
    });

    let result = await playlistEntry.save();
    if (result) { res.status(200).json({ success: true, playlist: playlistEntry, message: "Playlist successfully created", }); }
    else { res.status(200).json({ success: false, message: "Failed to create Playlist: Unknown Error", }); }
}