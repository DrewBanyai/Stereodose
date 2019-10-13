const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const userRegisterController = require("../controllers/userRegister");
const userLoginController = require("../controllers/userLogin");
const userDeleteController = require("../controllers/userDelete");
const userGetFavoritesController = require("../controllers/userGetFavorites");

//  USER ROUTES
router.post("/register", userRegisterController.userRegister);
router.post("/login", userLoginController.userLogin);
router.post("/delete", checkAuth, userDeleteController.userDelete);
router.post("/getFavorites", checkAuth, userGetFavoritesController.userGetFavorites);

module.exports = router;