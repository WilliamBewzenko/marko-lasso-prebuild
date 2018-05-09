const writer = require('./s3-writter');

module.exports = function (lasso, pluginConfig) {
  lasso.config.writer = writer(pluginConfig);
};
