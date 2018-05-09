const crypto = require('crypto');

module.exports = function (fileBuffer) {
  return crypto.createHash('sha1')
    .update(fileBuffer.toString())
    .digest('hex');
};
