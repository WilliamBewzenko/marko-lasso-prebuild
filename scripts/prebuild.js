const path = require('path');
const util = require('util');
const rimraf = util.promisify(require('rimraf'));

async function exec(params) {
  await rimraf(path.join(__dirname, '..', '.cache'));
  await rimraf(path.join(__dirname, '..', 'static'));
  require('../config');
}

exec();
