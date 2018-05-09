const mongoose = require('mongoose');
const environment = require('./environment');

mongoose.Promise = global.Promise;

const db = mongoose.connect(environment.db);

module.exports = db;
