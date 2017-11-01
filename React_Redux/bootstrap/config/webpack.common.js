const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.parts.js');
const packageJson = require('../package.json');

const VENDOR_LIBS = Object.keys(packageJson.dependencies);

const commonConfig = merge([
  {
    entry: {
      bundle: './src/index.jsx',
      vendor: VENDOR_LIBS,
    },
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].[chunkhash].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
    },
  },
  parts.jsLinterLoader(),
  parts.jsTranspilerLoader(),
  parts.stylesLoader(),
  parts.imagesLoader(),
  parts.useHtmlTemplatePlugin(),
  parts.codeSplittingPlugin(),
]);

module.exports = commonConfig;
