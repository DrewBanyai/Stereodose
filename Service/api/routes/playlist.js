const express = require("express");
const router = express.Router();

const playlistCreateController = require("../controllers/playlistCreate");
const playlistDeleteController = require("../controllers/playlistDelete");
const playlistDetailsController = require("../controllers/playlistDetails");
const playlistFavoriteController = require("../controllers/playlistFavorite");
const playlistRandomGroupController = require("../controllers/playlistRandomGroup");

//  PLAYLIST ROUTES
router.post("/create", playlistCreateController.playlistCreate);
router.post("/delete", playlistDeleteController.playlistDelete);
router.post("/details", playlistDetailsController.playlistDetails);
router.post("/favorite", playlistFavoriteController.playlistFavorite);
router.post("/randomGroup", playlistRandomGroupController.playlistRandomGroup);

module.exports = router;