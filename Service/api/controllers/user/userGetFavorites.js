const jwt = require("jsonwebtoken");

const varcheck = require("../../varcheck");

const userModel = require("../../models/user");

exports.userGetFavorites = async (req, res, next) => {
    //  Ensure we have a valid 'Username' and 'Password' value
    if (!varcheck.check("Username", "String", req.body)) {  res.status(400).json({ success: false, message: "A valid 'Username' value must be provided" }); return; }

    //  If a user with that name already exists, return a failure
    let username = req.body.Username.toLowerCase();
    let userEntry = await userModel.findOne({ username: username }).exec();
    if (!userEntry) { res.status(200).json({ success: false, message: "No user exists with that Username"}); return; }

    //  Check that the user is the user they specify as creator
    console.log("USERNAME:", username);
    try { jwt.verify(req.body.token, process.env.JWT_KEY, { subject: username, expiresIn: "1d" }); }
    catch (error) { res.status(200).json({ success: false, message: "Username value incorrect", }); return; }

    res.status(200).json({ success: true, favoritePlaylists: userEntry.favoritePlaylists, favoriteTracks: userEntry.favoriteTracks, });

}