var notp = require('notp');
var base32 = require('thirty-two');

module.exports = (secret, appName) => {
  return {
    getURI: () => {
      var encoded = base32.encode(secret);
      var encodedForGoogle = encoded.toString().replace(/=/g, '');
      return 'otpauth://totp/' + appName + '?secret=' + encodedForGoogle;
    },
    verifyToken: (token) => {
      if(notp.totp.verify(token, secret)) return true;
      else return false;
    },
    getToken: () => {
      return notp.totp.gen(secret);
    }
  }
}
