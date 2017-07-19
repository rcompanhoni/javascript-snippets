# browserify

A simple app, with a single page, that generates a random color and sets the background to that color. It demonstrates how to use the npm package
'random-color' in a HTML JavaScript code via 'browserify'.In package.json the script "build-my-js" executes the command to compile the original js code to the resulting js file that can be used in the browser.

Browserify is a tool for packaging JavaScript that allows you to use the require function just like you do in Node. It lets you easily define modules. If Browserify sees that evan.js requires cake.js and burrito.js, it’ll package up cake.js and burrito.js and concatenate them into the compiled output file. Both Node-based and browser-based JavaScript can require Node modules, letting you share code between server and client with no extra work.

### PACKAGES USED

* browserify: a tool for packaging JavaScript that allows you to use the 'require' function in browser JS just like you do in Node
* random-color: npm package that generates a random RGB color string

