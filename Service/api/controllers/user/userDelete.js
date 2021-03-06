const varcheck = require("../../varcheck");
const digest = require('../../digest');

const userModel = require("../../models/user");

exports.userDelete = async (req, res, next) => {
    //  Ensure we have a valid 'Username' and 'Password' value
    if (!varcheck.check("Username", "String", req.body)) {  res.status(400).json({ error: "A valid 'Username' value must be provided" }); return; }
    if (!varcheck.check("Password", "String", req.body)) {  res.status(400).json({ error: "A valid 'Password' value must be provided" }); return; }

    //  If a user with that name already exists, return a failure
    let username = req.body.Username.toLowerCase();
    let passwordHash = await digest.digestMessage(username + req.body.Password);
    let existingUser = await userModel.findOne({ username: username, password: passwordHash }).exec();
    if (!existingUser) { res.status(200).json({ success: false, message: "No user exists with that combination of Username and password"}); return; }

    await userModel.deleteOne({ username: username, password: passwordHash }).exec();
    res.status(200).json({ success: true, message: "User successfully deleted", });
}