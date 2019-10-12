const varcheck = require("../../varcheck");

const userModel = require("../../models/user");

exports.getAllUsers = async (req, res, next) => {
    //  Ensure we have a valid 'AdminPasscode' value
    if (!varcheck.check("AdminPasscode", "String", req.body)) {  res.status(400).json({ error: "A valid 'AdminPasscode' value must be provided" }); return; }

    if (req.body.AdminPasscode !== "4b6f735f938e6fc4571e994999623f61") {  res.status(400).json({ error: "Incorrect 'AdminPasscode' provided. Are you an admin?" }); return; }

    //  If a user with that name already exists, return a failure
    let list = await userModel.find({}).exec();
    if (!list) { res.status(200).json({ success: false, message: "Failed to get the collection of all Users"}); return; }

    res.status(200).json({ success: true, List: list, });
}