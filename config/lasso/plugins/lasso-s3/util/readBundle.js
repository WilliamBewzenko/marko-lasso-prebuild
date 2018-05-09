const readFileStream = require('./readFileStream');

module.exports = function (reader, bundle, timeout) {
  return readFileStream({
    readStream: reader.readBundle(),
    path: bundle.name,
    timeout,
  });
};
