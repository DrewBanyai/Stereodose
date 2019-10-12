const mongoose = require("mongoose");
const varcheck = require("../varcheck");

const userModel = require("../models/user");

exports.userRegister = async (req, res, next) => {
    //  Ensure we have a valid 'Username' and 'Password' value
    if (!varcheck.check("Username", "String", req.body)) {  res.status(400).json({ error: "A valid 'Username' value must be provided" }); return; }
    if (!varcheck.check("Password", "String", req.body)) {  res.status(400).json({ error: "A valid 'Password' value must be provided" }); return; }

    //  If a user with that name already exists, return a failure
    let userExists = await userModel.findOne({ username: req.body.Username }).exec();
    if (userExists) { res.status(200).json({ success: false, message: "A user already exists with that username"}); return; }

    //  If we've gotten this far, register the account into the database and return a success
    const userEntry = new userModel({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.Username,
        password: req.body.Password,
        signupDate: new Date(),
        favoritePlaylists: [],
        favoriteTracks: [],
    });
    let result = await userEntry.save();
    console.log(result);

    //  TODO:  Handle the Username and Password values and attempt to register, and return a token if successful
    res.status(200).json({ success: true, message: "User registration successful", });
}