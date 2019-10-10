const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => { res.status(200).json({ message: "api/Playlist/ get request (GET not supported)", }); });
router.post('/', (req, res, next) => { res.status(200).json({ message: "api/Playlist/ post request (POST not supported)", }); });

router.post('/create', (req, res, next) => {
    res.status(200).json({
        //  TODO: Handle api/playlist/create call
        message: "api/Playlist/create post request",
    });
});

router.post('/delete', (req, res, next) => {
    res.status(200).json({
        //  TODO: Handle api/playlist/delete call
        message: "api/Playlist/delete post request",
    });
});

router.post('/details', (req, res, next) => {
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
});

router.post('/favorite', (req, res, next) => {
    res.status(200).json({
        //  TODO: Handle api/playlist/favorite call
        message: "api/Playlist/favorite post request",
    });
});

module.exports = router;