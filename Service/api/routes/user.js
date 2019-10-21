const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const userRegisterController = require("../controllers/user/userRegister");
const userLoginController = require("../controllers/user/userLogin");
const userDeleteController = require("../controllers/user/userDelete");
const userGetFavoritesController = require("../controllers/user/userGetFavorites");

//  USER ROUTES
router.post("/register", userRegisterController.userRegister);
router.post("/login", userLoginController.userLogin);
router.post("/delete", checkAuth, userDeleteController.userDelete);
router.post("/getFavorites", checkAuth, userGetFavoritesController.userGetFavorites);

module.exports = router;