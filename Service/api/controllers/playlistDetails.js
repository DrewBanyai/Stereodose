const mongoose = require('mongoose');
const varcheck = require('../varcheck');

const playlistModel = require('../models/playlist');

exports.playlistDetails = async (req, res, next) => {
    //  Ensure we have a valid 'PlaylistID' value
    if (!varcheck.check("PlaylistID", "Number", req.body)) {  res.status(400).json({ error: "A valid 'PlaylistID' value must be provided" }); return; }

    //  TODO: Check the database for the playlist ID and return it's information if it exists
    res.status(200).json({
        //  TODO: Handle api/playlist/details call
        message: "api/Playlist/details post request",
        PlaylistName: "PLAYLIST_NAME",
        PlaylistID: req.body.PlaylistID,
        Playlist: [
			"https://soundcloud.com/pauli-niemi/cherry-smile",
			"https://soundcloud.com/pauli-niemi/clouds",
			"https://soundcloud.com/pauli-niemi/warm-thoughts-w-omar",
			"https://soundcloud.com/pauli-niemi/drowning-in-her-eyes",
			"https://soundcloud.com/pauli-niemi/i-was-a-fool-for-you-1",
			"https://soundcloud.com/pauli-niemi/lust-or-love",
			"https://soundcloud.com/user-51502133/ferris-wheel",
			"https://soundcloud.com/rxseboy/im-sad-that-ur-gone",
			"https://soundcloud.com/tsuki_uzu/eyes-on-you",
			"https://soundcloud.com/iam6teen/tranquil",
			"https://soundcloud.com/pauli-niemi/youre-not-real",
			"https://soundcloud.com/musicbysxul/remember-to-remember",
		],
    });
}