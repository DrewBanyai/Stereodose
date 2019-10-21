const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const playlistCreateController = require("../controllers/playlist/playlistCreate");
const playlistListFavoritesController = require("../controllers/playlist/playlistListFavorites");
const playlistListMineController = require("../controllers/playlist/playlistListMine");
const playlistDeleteController = require("../controllers/playlist/playlistDelete");
const playlistExistsController = require("../controllers/playlist/playlistExists");
const playlistDetailsController = require("../controllers/playlist/playlistDetails");
const playlistFavoriteController = require("../controllers/playlist/playlistFavorite");
const playlistRandomGroupController = require("../controllers/playlist/playlistRandomGroup");
const playlistSetHiddenController = require("../controllers/playlist/playlistSetHidden");

//  PLAYLIST ROUTES
router.post("/create", checkAuth, playlistCreateController.playlistCreate);
router.post("/listMine", checkAuth, playlistListMineController.playlistListMine);
router.post("/listFavorites", checkAuth, playlistListFavoritesController.playlistListFavorites);
router.post("/delete", checkAuth, playlistDeleteController.playlistDelete);
router.post("/exists", playlistExistsController.playlistExists);
router.post("/details", playlistDetailsController.playlistDetails);
router.post("/favorite", checkAuth, playlistFavoriteController.playlistFavorite);
router.post("/randomGroup", playlistRandomGroupController.playlistRandomGroup);
router.post("/setHidden", checkAuth, playlistSetHiddenController.playlistSetHidden);

module.exports = router;