const mongoose = require('mongoose');
const varcheck = require('../varcheck');

const userModel = require('../models/user');

exports.userRegister = async (req, res, next) => {
    //  Ensure we have a valid 'Username' and 'Password' value
    if (!varcheck.check("Username", "String", req.body)) {  res.status(400).json({ error: "A valid 'Username' value must be provided" }); return; }
    if (!varcheck.check("Password", "String", req.body)) {  res.status(400).json({ error: "A valid 'Password' value must be provided" }); return; }

    //  TODO:  Handle the Username and Password values and attempt to register, and return a token if successful
    res.status(200).json({ message: "/user/register post request", });
}