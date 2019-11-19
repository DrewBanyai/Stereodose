const jwt = require("jsonwebtoken");

const varcheck = require("../../varcheck");

const checkAuth = require("../../middleware/checkAuth");

const playlistModel = require("../../models/playlist");

exports.playlistRandomGroup = async (req, res, next) => {
    //  Ensure we have a valid 'Username' value
    if (!varcheck.check("Username", "String", req.body)) { res.status(400).json({ error: "A valid 'Username' value must be provided" }); return; }
    if (!varcheck.check("Filter", "Object", req.body)) { res.status(400).json({ error: "A valid 'Filter' value must be provided" }); return; }

    //  Check that the user is the user they specify as creator
    let username = "";
    if ((req.body.Username !== "") && (req.body.token !== "")) {

        username = req.body.Username.toLowerCase();
        if (!checkAuth.authCheck(username, req.body.token)) { res.status(400).json({ error: "Invalid token provided" }); return; }
        //try { jwt.verify(req.body.token, process.env.JWT_KEY, { subject: username, expiresIn: "1d" }); }
        //catch (error) { res.status(200).json({ success: false, message: "Username value incorrect", }); return; }
    }

    //  Attempt to grab all playlists, and return a failure if we can not
    let list = await playlistModel.find(req.body.Filter).exec();
    if (!list) { res.status(200).json({ success: false, message: "Failed to get the collection of all Playlists"}); return; }

    //  Filter the list down to hide any hidden playlists unless the playlist belongs to the given user.
    list = list.filter((listEntry) => { return (!listEntry.hidden || (listEntry.creator === username)); })

    //  DEBUG TEST //
    //list.length = Math.min(list.length, 3);

    res.status(200).json({ success: true, List: list, });
}