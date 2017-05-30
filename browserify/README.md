## browserify

A simple app, with a single page, that generates a random color and sets the background to that color. It demonstrates how to use the npm package
'random-color' in a HTML JavaScript code via 'browserify'.

In package.json the following script is declared: "build-my-js": "browserify main.js -o compiled.js"

To compile the JS that will be inserted in the HTML/JS: npm run build-my-js

* browserify: a tool for packaging JavaScript that allows you to use the 'require' function in browser JS just like you do in Node
* random-color: npm package that generates a random RGB color string

