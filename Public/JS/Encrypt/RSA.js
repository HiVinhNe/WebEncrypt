const crypto = require('crypto');
const  key = Buffer.from('ebc1b0cd2baae29fc7d9e3f6f329bc7e70b81e7588b3e062efe91b8c6a53b98d', 'hex');
const iv = Buffer.from('aff5d74563b3c4620423281831e8bc37','hex');
function encryptAES(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

function decryptAES(encrypted) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = {
    decryptAES,
    encryptAES
};