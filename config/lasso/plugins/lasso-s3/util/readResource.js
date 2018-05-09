const readFileStream = require('./readFileStream');

module.exports = function (reader, path, timeout) {
  return readFileStream({
    readStream: reader.readResource(),
    path,
    timeout
  });
};
