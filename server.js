require('../config');

const express = require('express');
const compression = require('compression')

const app = express();

app.use(compression());
app.use(require('lasso/middleware').serveStatic());

require('../routes')(app);

const port = 8080;

app.listen(port, (err) => {
  console.log('Listening on port %d', port);

  // The browser-refresh module uses this event to know that the
  // process is ready to serve traffic after the restart
  if (process.send) {
    process.send('online');
  }
});
