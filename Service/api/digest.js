const crypto = require("crypto");

exports.digestMessage = async (message) => {
    let hash = crypto.createHash('sha256');
    return hash.update(message).digest('base64');
};