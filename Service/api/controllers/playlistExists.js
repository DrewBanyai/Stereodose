const varcheck = require("../varcheck");

const playlistModel = require("../models/playlist");

exports.playlistExists = async (req, res, next) => {
    //  Ensure we have a valid 'PlaylistID' value
    if (!varcheck.check("Name", "String", req.body)) {  res.status(400).json({ success: false, error: "A valid 'Name' value must be provided" }); return; }

	let playlist = null;
	try { playlist = await playlistModel.findOne({ name: req.body.Name }).exec(); } catch (e) { console.log("ERROR:", e.message); }
    if (!playlist) { res.status(200).json({ success: true, exists: false, message: "No playlist with that ID exists" }); return; }
    
    res.status(200).json({  success: true, exists: true, message: "Playlist exists with that name", });
}