const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try { req.userAuthorization = jwt.verify(req.body.token, process.env.JWT_KEY); next(); }
    catch (error) {  return res.status(200).json({ success: false, message: "Authorization failed", }); }
}