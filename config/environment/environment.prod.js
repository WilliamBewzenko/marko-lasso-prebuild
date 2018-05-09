const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const environment = {
  redis: '127.0.0.1:6379',
  db: `mongodb://${DB_USER}:${DB_PASSWORD}@ds263759.mlab.com:63759/feedback`,
}

module.exports = environment
