let environment

if (process.env.NODE_ENV === 'production') {
  environment = require('./environment.prod')
} else {
  environment = require('./environment.dev')
}

module.exports = environment
