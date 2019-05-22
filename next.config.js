const path = require('path');

const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');

// Taken from https://github.com/reduxjs/redux/blob/master/src/compose.js
const compose = (...funcs) => funcs.reduce((a, b) => (...args) => a(b(...args)));

module.exports = compose(
  withSass,
  withTypescript
)({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  },
  webpack(config, _options) {
    // Setup webpack aliases for absolute imports, eg. `@/components/Title`
    ['assets', 'components', 'ducks', 'models', 'services'].forEach(dir => {
      config.resolve.alias[`@/${dir}`] = path.join(__dirname, dir);
    });

    config.module.rules.push({
      test: /\.(test|spec).(js|ts)x?$/,
      loader: 'ignore-loader'
    });

    return config;
  }
});
