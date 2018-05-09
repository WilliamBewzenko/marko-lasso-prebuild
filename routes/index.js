module.exports = (app) => {
  app.get('/', require('./home'));
  app.get('/progressive', require('./progressive'));
}
