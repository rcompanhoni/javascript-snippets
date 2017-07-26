# REAL WORLD WEBPACK

From Stephen Grider's Webpack 2: The Complete Developer's Guider. This example shows how to use a webpack configuration that will add two bundles -- one for the application code and one for the dependencies. This is useful for preventing the browser to download a single, big bundle.js file everytime the user opens the application.

### HOW TO RUN THE APPLICATION

* You can use the 'standalone' webpack version with the command *npm run build* which will create the output in the *'dist'* folder.
* Alternatively, you can use *npm run serve* which will use webpack-dev-server that manages the output content in memory.

### WEBPACK CODE SPLITTING AND REACT ROUTER

This application defines a routing component which uses **System.import** to load the appropriate React component for each route. Using this approach allows webpack to
split the bundle, optimizing the page loading time.

### PACKAGES USED

* **CommonsChunkPlugin**: used in order to specify that everything that is in the bundle 'vendor.js' will not be included (again) in the main bundle.js file
* **html-webpack-plugin**: automatically includes the generated bundle files in the index.html file.
* **rimraf**: to delete a folder in one of the package.json scripts. In this app, webpack is continuously adding bundles with hashed names to the 'dist' folder. By using rimraf we ensure that the contents of dist are always deleted when running npm run build. We could use some specific OS command instead of rimraf but by using it we make the script OS agnostic (see scripts in package.json)
* **webpack-dev-server**: Use webpack with a development server that provides live reloading. This should be used for **development only**.
