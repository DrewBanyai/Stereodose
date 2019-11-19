const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const varcheck = require("../../varcheck");

const checkAuth = require("../../middleware/checkAuth");

const userModel = require("../../models/user");
const playlistModel = require("../../models/playlist");

exports.playlistListFavorites = async (req, res, next) => {
    //  Ensure we have a valid 'Username' value
    if (!varcheck.check("Creator", "String", req.body)) {  res.status(400).json({ success: false, message: "A valid 'Creator' value must be provided" }); return; }

    //  Find the creator's user
    let username = req.body.Creator.toLowerCase();
    let existingUser = await userModel.findOne({ username: username }).exec();
    if (!existingUser) { res.status(200).json({ success: false, message: "No user exists with that Creator username"}); return; }

    //  Check that the user is the user they specify as creator
    if (!checkAuth.authCheck(username, req.body.token)) { res.status(400).json({ error: "Invalid token provided" }); return; }
    //try { jwt.verify(req.body.token, process.env.JWT_KEY, { subject: username, expiresIn: "1d" }); }
    //catch (error) { res.status(200).json({ success: false, message: "Playlist username value incorrect", }); return; }

    //  Form a favorites list to check against
    let favorites = [];
    existingUser.favoritePlaylists.forEach((fave) => { favorites.push(mongoose.Types.ObjectId(fave)); });

    //  If we've gotten this far, grab the list of playlists by the given user
    let playlistList = null;
    try { playlistList = await playlistModel.find({ _id: { $in: favorites } }).exec(); } catch (e) { console.log("ERROR:", e.message); }
    if (!playlistList) { res.status(200).json({ success: true, exists: false, message: "No playlists with that Creator exist" }); return; }

    res.status(200).json({ success: true, message: "Favorites found", favorites: playlistList, });
}