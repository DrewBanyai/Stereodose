const express = require('express');
const router = express.Router();

const userRegisterController = require('../controllers/userRegister');
const userLoginController = require('../controllers/userLogin');
const userDeleteController = require('../controllers/userDelete');
const userGetFavoritesController = require('../controllers/userGetFavorites');

router.get('/', (req, res, next) => { res.status(200).json({ message: "/user get request (GET not supported)", }); });
router.get('/register', (req, res, next) => { res.status(200).json({ message: "/user/register get request (GET not supported)", }); });
router.get('/login', (req, res, next) => { res.status(200).json({ message: "/user/login get request (GET not supported)", }); });
router.get('/delete', (req, res, next) => { res.status(200).json({ message: "/user/login get request (GET not supported)", }); });
router.get('/getFavorites', (req, res, next) => { res.status(200).json({ message: "/user/login get request (GET not supported)", }); });

router.post('/register', userRegisterController.userRegister);
router.post('/login', userLoginController.userLogin);
router.post('/delete', userDeleteController.userDelete);
router.post('/getFavorites', userGetFavoritesController.userGetFavorites);

module.exports = router;