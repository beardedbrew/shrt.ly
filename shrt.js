var crypto = require('crypto');

var getCode = function(url) {
  var shasum = crypto.createHash('sha1');
  return shasum.update(url).digest('base64').substr(0, 5);
}

exports.create = function(url) {
  var hash_code = getCode(url);
  return { url: url, clicks: 0, hash_code: hash_code };
};

exports.getCode = getCode;
