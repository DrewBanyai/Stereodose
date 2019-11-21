const mongoose = require("mongoose");

const varcheck = require("../../varcheck");
const digest = require('../../digest');

const checkAuth = require("../../middleware/checkAuth");

const userModel = require("../../models/user");

exports.userRegister = async (req, res, next) => {
    //  Ensure we have a valid 'Username' and 'Password' value
    if (!varcheck.check("Username", "String", req.body)) {  res.status(400).json({ error: "A valid 'Username' value must be provided" }); return; }
    if (!varcheck.check("Password", "String", req.body)) {  res.status(400).json({ error: "A valid 'Password' value must be provided" }); return; }

    //  If a user with that name already exists, return a failure
    let username = req.body.Username.toLowerCase();
    let userExists = await userModel.findOne({ username: username }).exec();
    if (userExists) { res.status(200).json({ success: false, message: "A user already exists with that username"}); return; }
    let passwordHash = await digest.digestMessage(username + req.body.Password);

    userEntry = new userModel({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        password: passwordHash,
        signupDate: new Date(),
        favoritePlaylists: [],
        favoriteTracks: [],
    });
    await userEntry.save();

    userEntry._id = undefined;
    userEntry.password = undefined;
    userEntry.__v = undefined;

    //  Return a token if successful
    //checkAuth.saveOffToken(username, passwordHash);
    //const token = jwt.sign({ username: username, password: passwordHash, }, process.env.JWT_KEY, { subject: username, expiresIn: "1d" });
    res.status(200).json({ success: true, token: 0, user: userEntry, message: "User registration successful", });
}