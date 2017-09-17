# Webpack simple example

From Stephen Grider's Webpack 2: The Complete Developer's Guider. This example shows how to configure a simple webpack.config.js file specifying an entry point and configuring the resulting file's name and path.

```javascript
const path = require('path');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    }
};

module.exports = config;
```

### PACKAGES USED

* **webpack**: is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.
