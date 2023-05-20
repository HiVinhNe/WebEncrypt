const crypto = require('crypto');

function hashSHA512(data) {
  const hash = crypto.createHash('sha512');
  hash.update(data);
  return hash.digest('hex');
};
module.exports = hashSHA512;