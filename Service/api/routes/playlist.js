const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const playlistCreateController = require("../controllers/playlistCreate");
const playlistDeleteController = require("../controllers/playlistDelete");
const playlistExistsController = require("../controllers/playlistExists");
const playlistDetailsController = require("../controllers/playlistDetails");
const playlistFavoriteController = require("../controllers/playlistFavorite");
const playlistRandomGroupController = require("../controllers/playlistRandomGroup");

//  PLAYLIST ROUTES
router.post("/create", checkAuth, playlistCreateController.playlistCreate);
router.post("/delete", checkAuth, playlistDeleteController.playlistDelete);
router.post("/exists", playlistExistsController.playlistExists);
router.post("/details", playlistDetailsController.playlistDetails);
router.post("/favorite", checkAuth, playlistFavoriteController.playlistFavorite);
router.post("/randomGroup", playlistRandomGroupController.playlistRandomGroup);

module.exports = router;