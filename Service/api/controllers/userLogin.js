const varcheck = require('../varcheck');

const userModel = require('../models/user');

exports.userLogin = async (req, res, next) => {
    //  Ensure we have a valid 'Username' and 'Password' value
    if (!varcheck.check("Username", "String", req.body)) {  res.status(400).json({ error: "A valid 'Username' value must be provided" }); return; }
    if (!varcheck.check("Password", "String", req.body)) {  res.status(400).json({ error: "A valid 'Password' value must be provided" }); return; }

    //  If a user with that name already exists, return a failure
    let existingUser = await userModel.findOne({ username: req.body.Username, password: req.body.Password }).exec();
    if (!existingUser) { res.status(200).json({ success: false, message: "No user exists with that combination of Username and Password"}); return; }

    //  TODO: Return a token if successful
    res.status(200).json({ success: true, message: "User login successful", });

}