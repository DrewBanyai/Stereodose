const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => { res.status(200).json({ message: "User get request (GET not supported)", }); });

router.post('/login', (req, res, next) => {
    res.status(200).json({
        //  TODO: Handle api/user/login call
        message: "User login post request",
    });
});

router.post('/register', (req, res, next) => {
    res.status(200).json({
        //  TODO: Handle api/user/register call
        message: "User register post request",
    });
});

module.exports = router;