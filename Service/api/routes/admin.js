const express = require("express");
const router = express.Router();

const userAdminGetAllUsersController = require("../controllers/admin/getAllUsers");
const userAdminGetAllPlaylistsController = require("../controllers/admin/getAllPlaylists");

//  ADMIN ROUTES
router.post("/getAllUsers", userAdminGetAllUsersController.getAllUsers);
router.post("/getAllPlaylists", userAdminGetAllPlaylistsController.getAllPlaylists);

module.exports = router;