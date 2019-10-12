exports.playlistRandomGroup = async (req, res, next) => {
    res.status(200).json({
        message: "api/Playlist/randomGroup post request",
        playlistGroup: [
            "5da1563482d91b031cc9cbbc",
            "5da154880b5d012dc04a486f",
		],
    });
}