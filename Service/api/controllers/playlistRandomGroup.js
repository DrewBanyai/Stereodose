exports.playlistRandomGroup = async (req, res, next) => {
    res.status(200).json({
        message: "api/Playlist/randomGroup post request",
        playlistGroup: [
			"5da13b6336a0434ff4f3c644",
		],
    });
}