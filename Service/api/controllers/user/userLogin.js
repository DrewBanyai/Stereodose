const jwt = require("jsonwebtoken");

const varcheck = require("../../varcheck");
const digest = require('../../digest');

const authCheck = require("../../middleware/authCheck");

const userModel = require("../../models/user");

exports.userLogin = async (req, res, next) => {
    //  Ensure we have a valid 'Username' and 'Password' value
    if (!varcheck.check("Username", "String", req.body)) {  res.status(400).json({ error: "A valid 'Username' value must be provided" }); return; }
    if (!varcheck.check("Password", "String", req.body)) {  res.status(400).json({ error: "A valid 'Password' value must be provided" }); return; }

    //  If a user with that name already exists, return a failure
    let username = req.body.Username.toLowerCase();
    let passwordHash = await digest.digestMessage(username + req.body.Password);
    let userEntry = await userModel.findOne({ username: username, password: passwordHash }).exec();
    if (!userEntry) { res.status(200).json({ success: false, message: "No user exists with that combination of Username and Password"}); return; }
    
    res.status(200).json({ success: true, token: "test", user: null, message: "User login successful", });
    return;
    
    userEntry._id = undefined;
    userEntry.password = undefined;
    userEntry.__v = undefined;

    //  Return a token if successful
    authCheck.saveOffToken(username, passwordHash);
    //const token = jwt.sign({ username: username, password: passwordHash, }, process.env.JWT_KEY, { subject: username, expiresIn: "1d" });
    res.status(200).json({ success: true, token: passwordHash, user: userEntry, message: "User login successful", });
}
