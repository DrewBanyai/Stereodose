const jwt = require("jsonwebtoken");

const varcheck = require("../../varcheck");

const playlistModel = require("../../models/playlist");

exports.playlistSetHidden = async (req, res, next) => {
    //  Ensure we have a valid 'PlaylistID', 'Username', and 'Password' value
    if (!varcheck.check("PlaylistID", "String", req.body)) {  res.status(400).json({ error: "A valid 'PlaylistID' value must be provided" }); return; }
    if (!varcheck.check("Username", "String", req.body)) {  res.status(400).json({ error: "A valid 'Username' value must be provided" }); return; }
    if (!varcheck.check("Hidden", "Boolean", req.body)) {  res.status(400).json({ error: "A valid 'Hidden' value must be provided" }); return; }

    //  If a playlist with the given PlaylistID doesn't exist, return a failure
	let playlist = null;
	try { playlist = await playlistModel.findOne({ _id: req.body.PlaylistID }).exec(); } catch (e) { console.log("ERROR:", e.message); }
	if (!playlist) { res.status(200).json({ error: "No playlist with that ID exists" }); return; }

    //  Check that the user is the user they specify as creator
    let username = req.body.Username.toLowerCase();
    try { jwt.verify(req.body.token, process.env.JWT_KEY, { subject: username, expiresIn: "1d" }); }
    catch (error) { res.status(200).json({ success: false, message: "Username value incorrect", }); return; }

    let playlistHiddenStatus = playlist.hidden;
    if (playlistHiddenStatus === req.body.Hidden) { res.status(200).json({ success: true, message: "Playlist is already in that state", }); return; }
    playlist.hidden = req.body.Hidden;

    let result = await playlist.updateOne({ hidden: playlist.hidden }).exec();
    if (result) { res.status(200).json({ success: true, message: "Playlist hidden value successfully set", }); }
    else { res.status(200).json({  success: false, message: "Failed to set Playlist hidden status: Unknown Error", }); }
}