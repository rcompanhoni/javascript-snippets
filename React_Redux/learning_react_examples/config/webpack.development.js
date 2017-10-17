const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const parts = require('./webpack.parts.js');

const developmentConfig = merge([
  commonConfig,
  parts.sourceMapConfig(),
  parts.devServerConfig({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
]);

module.exports = developmentConfig;
