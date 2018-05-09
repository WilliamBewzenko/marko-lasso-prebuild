const isProduction = process.env.NODE_ENV === 'production';
const isPrebuild = process.env.PREBUILD === 'true';

let config = {
  plugins: [
    'lasso-marko',
  ],
  bundlingEnabled: isProduction,
  minify: isProduction,
  fingerprintsEnabled: isProduction,
  require: {
    transforms: [{
      transform: 'lasso-babel-transform',
      config: {
        extensions: ['.js', '.marko'],
        babelOptions: {
          presets: [
            ['env', {
              targets: {
                chrome: 60,
                ie: 11,
              },
            }]
          ]
        },
      },
    }],
  },
};

if (isProduction) {
  config = require('./lasso.prod')(config);
} else {
  config = require('./lasso.dev')(config);
}

if (isPrebuild) {
  require('./lasso.prebuild')(config);
} else {
  require('./lasso.runtime')(config);
}
