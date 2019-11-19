const jwt = require("jsonwebtoken");

const varcheck = require("../../varcheck");

const checkAuth = require("../../middleware/checkAuth");

const playlistModel = require("../../models/playlist");
const userModel = require("../../models/user");

exports.playlistFavorite = async (req, res, next) => {
    //  Ensure we have a valid 'PlaylistID', 'Username', and 'Password' value
    if (!varcheck.check("PlaylistID", "String", req.body)) {  res.status(400).json({ error: "A valid 'PlaylistID' value must be provided" }); return; }
    if (!varcheck.check("Username", "String", req.body)) {  res.status(400).json({ error: "A valid 'Username' value must be provided" }); return; }
    if (!varcheck.check("Favorite", "Boolean", req.body)) {  res.status(400).json({ error: "A valid 'Favorite' value must be provided" }); return; }

    //  If a playlist with the given PlaylistID doesn't exist, return a failure
	let playlist = null;
	try { playlist = await playlistModel.findOne({ _id: req.body.PlaylistID }).exec(); } catch (e) { console.log("ERROR:", e.message); }
	if (!playlist) { res.status(200).json({ error: "No playlist with that ID exists" }); return; }

    //  If a user with the given Username doesn't exist, return a failure
    let username = req.body.Username.toLowerCase();
    let existingUser = await userModel.findOne({ username: username }).exec();
    if (!existingUser) { res.status(200).json({ success: false, message: "No user exists with that Username"}); return; }

    //  Check that the user is the user they specify as creator
    if (!checkAuth.authCheck(username, req.body.token)) { res.status(400).json({ error: "Invalid token provided" }); return; }
    //try { jwt.verify(req.body.token, process.env.JWT_KEY, { subject: username, expiresIn: "1d" }); }
    //catch (error) { res.status(200).json({ success: false, message: "Username value incorrect", }); return; }

    let favoriteExists = existingUser.favoritePlaylists.includes(req.body.PlaylistID);
    if (favoriteExists === req.body.Favorite) { res.status(200).json({ success: true, message: "Playlist favorite status is already in this state"}); return; }

    if (req.body.Favorite) { existingUser.favoritePlaylists.push(req.body.PlaylistID); }
    else { existingUser.favoritePlaylists = existingUser.favoritePlaylists.filter((entry) => (entry !== req.body.PlaylistID)); }

    let result = await existingUser.updateOne({ favoritePlaylists: existingUser.favoritePlaylists }).exec();
    if (result) { res.status(200).json({  success: true, user: existingUser ,message: "Playlist favorite status successfully set", }); }
    else { res.status(200).json({  success: false, message: "Failed to set Playlist favorite status: Unknown Error", }); }
}