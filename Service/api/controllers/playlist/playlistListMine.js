const jwt = require("jsonwebtoken");

const varcheck = require("../../varcheck");

const checkAuth = require("../../middleware/checkAuth");

const userModel = require("../../models/user");
const playlistModel = require("../../models/playlist");

exports.playlistListMine = async (req, res, next) => {
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

    //  If we've gotten this far, grab the list of playlists by the given user
    let playlists = null;
	try { playlists = await playlistModel.find({ creator: req.body.Creator }).exec(); } catch (e) { console.log("ERROR:", e.message); }
    if (!playlists) { res.status(200).json({ success: true, exists: false, message: "No playlists with that Creator exist" }); return; }

    res.status(200).json({ success: true, message: "Playlists found", playlists: playlists, });
}