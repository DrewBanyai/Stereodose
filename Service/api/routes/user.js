const express = require("express");
const router = express.Router();

const userRegisterController = require("../controllers/userRegister");
const userLoginController = require("../controllers/userLogin");
const userDeleteController = require("../controllers/userDelete");
const userGetFavoritesController = require("../controllers/userGetFavorites");

//  USER ROUTES
router.post("/register", userRegisterController.userRegister);
router.post("/login", userLoginController.userLogin);
router.post("/delete", userDeleteController.userDelete);
router.post("/getFavorites", userGetFavoritesController.userGetFavorites);

module.exports = router;