const path = require('path');

module.exports = (config) => {
  const lasso = require('lasso').create({
    ...config,
    bundles: [{
      name: 'common',
      dependencies: [{
        intersection: [
          path.resolve('./src/pages/index.marko'),
          path.resolve('./src/pages/progressive.marko'),
        ],
      }],
    }],
  });

  lasso.prebuildPage([
    {
      pageName: 'index',
      dependencies: [
        path.resolve('./src/pages/index.marko'),
      ],
      pageDir: path.resolve('./src/pages'),
    },
    {
      pageName: 'progressive',
      dependencies: [
        path.resolve('./src/pages/progressive.marko'),
      ],
      pageDir: path.resolve('./src/pages'),
    },
  ]);
}
