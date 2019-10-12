const mongoose = require('mongoose');
const varcheck = require('../varcheck');

const playlistModel = require('../models/playlist');
const userModel = require('../models/user');

exports.playlistFavorite = async (req, res, next) => {
    //  Ensure we have a valid 'PlaylistID', 'Username', and 'Password' value
    if (!varcheck.check("PlaylistID", "String", req.body)) {  res.status(400).json({ error: "A valid 'PlaylistID' value must be provided" }); return; }
    if (!varcheck.check("Username", "String", req.body)) {  res.status(400).json({ error: "A valid 'Username' value must be provided" }); return; }
    if (!varcheck.check("Password", "String", req.body)) {  res.status(400).json({ error: "A valid 'Password' value must be provided" }); return; }
    if (!varcheck.check("Favorite", "Boolean", req.body)) {  res.status(400).json({ error: "A valid 'Favorite' value must be provided" }); return; }

    //  If a playlist with the given PlaylistID doesn't exist, return a failure
	let playlist = null;
	try { playlist = await playlistModel.findOne({ _id: req.body.PlaylistID }).exec(); } catch (e) { console.log("ERROR:", e.message); }
	if (!playlist) { res.status(200).json({ error: "No playlist with that ID exists" }); return; }

    //  If a user with the given Username and Password doesn't exist, return a failure
    let existingUser = await userModel.findOne({ username: req.body.Username, password: req.body.Password }).exec();
    if (!existingUser) { res.status(200).json({ success: false, message: "No user exists with that combination of Username and Password"}); return; }

    let favoriteExists = existingUser.favoritePlaylists.includes(req.body.PlaylistID);
    if (req.body.Favorite) {
        if (favoriteExists) { res.status(200).json({ success: false, message: "The user already has this track list in their favorites"}); return; }
        existingUser.favoritePlaylists.push(req.body.PlaylistID);
        await existingUser.update({ favoritePlaylists: existingUser.favoritePlaylists }).exec();
        res.status(200).json({ success: true, message: "Playlist added to user favorites", });
    }
    else {
        if (!favoriteExists) { res.status(200).json({ success: false, message: "The user does not have this track list in their favorites"}); return; }
        existingUser.favoritePlaylists = existingUser.favoritePlaylists.filter((entry) => (entry !== req.body.PlaylistID));
        await existingUser.update({ favoritePlaylists: existingUser.favoritePlaylists }).exec();
        res.status(200).json({ success: true, message: "Playlist removed from user favorites", });
    }
}