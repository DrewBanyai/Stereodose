const varcheck = require('../varcheck');

const playlistModel = require('../models/playlist');

exports.playlistDelete = async (req, res, next) => {
    //  Ensure we have a valid 'PlaylistID' value
    if (!varcheck.check("PlaylistID", "String", req.body)) {  res.status(400).json({ error: "A valid 'PlaylistID' value must be provided" }); return; }

	let playlist = null;
	try { playlist = await playlistModel.findOne({ _id: req.body.PlaylistID }).exec(); } catch (e) { console.log("ERROR:", e.message); }
    if (!playlist) { res.status(200).json({ error: "No playlist with that ID exists" }); return; }
    
    await playlist.remove().exec();
    res.status(200).json({  success: true, message: "Playlist successfully deleted", });
}