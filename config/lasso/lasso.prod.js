const path = require('path');

module.exports = (config) => {
  // config.plugins = config.plugins.concat([{
  //   plugin: require('./plugins/lasso-s3'),
  //   enabled: true,
  // }]);
  // "urlPrefix": "http://mycdn/static",
  config.cacheKey = 'production';
  config.cacheProfile = 'production';
  config.loadPrebuild = true;

  return config;
}
