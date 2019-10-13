const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.userAuthorization = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Authorization failed",
        });
    }
}