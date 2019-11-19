const jwt = require("jsonwebtoken");

let tokenMap = {};

exports.saveOffToken = (username, token) => { tokenMap[token] = username; }
exports.authCheck = (username, token) => { return (tokenMap.hasOwnProperty(token) && tokenMap[token] === username); }

exports.checkAuth =  (req, res, next) => {
    try { req.userAuthorization = (tokenMap.hasOwnProperty(req.body.token) ? true : false); next(); }
    catch (error) { return res.status(200).json({ success: false, message: "Authorization failed", }); }

    //try { req.userAuthorization = jwt.verify(req.body.token, process.env.JWT_KEY); next(); }
    //catch (error) {  return res.status(200).json({ success: false, message: "Authorization failed", }); }
}
