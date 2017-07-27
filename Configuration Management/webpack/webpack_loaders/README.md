# Webpack Loaders

From Stephen Grider's Webpack 2: The Complete Developer's Guider. This example shows how to configure webpack loaders for handling ES6 syntax, CSS and images. It also introduces http://lorempixel.com, a nice provider of placeholder images.

### PACKAGES USED

##### BABEL (ES6) RELATED

* **babel-loader**: Allows transpiling JavaScript files using Babel and webpack.
* **babel-core**: Babel compiler core
* **babel-preset-env**: A Babel preset that can automatically determine the Babel plugins and polyfills you need based on your supported environments

##### CSS RELATED

* **style-loader**: Adds CSS to the DOM by injecting a <style> tag
* **css-loader**: Interprets @import and url() like import/require() and will resolve them.
* **extract-text-webpack-plugin**: Extract text from a bundle, or bundles, into a separate file.

##### IMAGE RELATED

* **image-webpack-loader**: Image loader module for webpack
* **url-loader**: Loads files as `base64` encoded URL