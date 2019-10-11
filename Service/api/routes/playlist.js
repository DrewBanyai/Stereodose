const express = require('express');
const router = express.Router();

const playlistCreateController = require('../controllers/playlistCreate');
const playlistDeleteController = require('../controllers/playlistDelete');
const playlistDetailsController = require('../controllers/playlistDetails');
const playlistFavoriteController = require('../controllers/playlistFavorite');

router.get('/', (req, res, next) => { res.status(200).json({ message: "/playlist get request (GET not supported)", }); });
router.get('/create', (req, res, next) => { res.status(200).json({ message: "/playlist/create get request (GET not supported)", }); });
router.get('/delete', (req, res, next) => { res.status(200).json({ message: "/playlist/delete get request (GET not supported)", }); });
router.get('/details', (req, res, next) => { res.status(200).json({ message: "/playlist/details get request (GET not supported)", }); });
router.get('/favorite', (req, res, next) => { res.status(200).json({ message: "/playlist/favorite get request (GET not supported)", }); });

router.post('/create', playlistCreateController.playlistCreate);
router.post('/delete', playlistDeleteController.playlistDelete);
router.post('/details', playlistDetailsController.playlistDetails);
router.post('/favorite', playlistFavoriteController.playlistFavorite);

module.exports = router;