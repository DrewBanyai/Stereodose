const jwt = require("jsonwebtoken");

let tokenMap = {};

exports.saveOffToken = async (username, token) => { tokenMap[token] = username; }

module.exports = (req, res, next) => {
    try { req.userAuthorization = (tokenMap.hasOwnProperty(req.body.token) ? true : false); next(); }
    catch (error) { return res.status(200).json({ success: false, message: "Authorization failed", }); }
    
    //try { req.userAuthorization = jwt.verify(req.body.token, process.env.JWT_KEY); next(); }
    //catch (error) {  return res.status(200).json({ success: false, message: "Authorization failed", }); }
}
