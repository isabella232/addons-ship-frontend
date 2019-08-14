const path = require('path');

const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules');
const withSass = require('@zeit/next-sass');

// Taken from https://github.com/reduxjs/redux/blob/master/src/compose.js
const compose = (...funcs) => funcs.reverse().reduce((a, b) => (...args) => a(b(...args)));

module.exports = compose(
  withTypescript,
  withSass,
  config =>
    withCSS({
      ...config,
      // Fix for Bitkit stlying, disable modules for CSS
      cssLoaderOptions: { modules: false }
    }),
  withTM
)({
  publicRuntimeConfig: {
    SHIP_API_URL: process.env.SHIP_API_URL,
    APP_BASE_URL: process.env.APP_BASE_URL,
    VERBOSE_LOGGING: process.env.VERBOSE_LOGGING
  },
  cssModules: true,
  cssLoaderOptions: {
    modules: true,
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  },
  transpileModules: ['@bitrise/bitkit'],
  webpack(config, _options) {
    // Setup webpack aliases for absolute imports, eg. `@/components/Title`
    ['assets', 'components', 'ducks', 'models', 'services', 'utils', 'mocks', 'config'].forEach(dir => {
      config.resolve.alias[`@/${dir}`] = path.join(__dirname, dir);
    });

    // Use ESNext version of Bitkit
    config.resolve.alias['@bitrise/bitkit'] = path.join(__dirname, 'node_modules/@bitrise/bitkit/lib/esn');

    config.module.rules.push({
      test: /\.(test|spec).(js|ts)x?$/,
      loader: 'ignore-loader'
    });

    return config;
  }
});
