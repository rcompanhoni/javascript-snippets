# JavaScript Snippets

A collection of code snippets for demonstrating various concepts related to JavaScript development

## Table of Contents
  - [Algorithms](#algorithms)
    - [A* Pathfinding Example](#a-pathfinding-example)
    - [Hacker Rank](#hacker-rank)
      - [Arrays Left Rotation](#arrays-left-rotation)
    - [Codility](#codility)
      - [Lesson 1 - Binary Gap](#lesson-1---binary-gap)
      - [Lesson 2 - Odd Occurrences in Array](#lesson-2---odd-occurrences-in-array)
      - [Lesson 2 - Cyclic Rotation](#lesson-2---cyclic-rotation)
  - [Chrome Extensions](#chrome-extensions)
    - [Google Custom Search Chrome Extension](#google-custom-search-chrome-extension)
  - [Configuration Management](#configuration-management)
    - [Browserify](#browserify)
    - [Forever](#forever)
    - [Grunt](#grunt)
    - [Webpack with Express](#webpack-with-express)
    - [Webpack loaders](#webpack-loaders)
    - [Webpack code splitting](#webpack-code-splitting)
    - [Webpack simple example](#webpack-simple-example)
    - [Webpack static website](#webpack-static-website)
  - [Express](#express)
    - [Express Web App](#express-web-app)
  - [Fundamentals](#fundamentals)
    - [Promises click game](#promises-click-game)
  - [Games](#games)
    - [Multiplayer Node.js Game Tutorial](#multiplayer-nodejs-game-tutorial)
    - [Phaser Express Basic](#phaser-express-basic)
  - [Mongoose](#mongoose)
    - [Simple Blog](#simple-blog)
    - [Electron app](#electron-app)
  - [Node.js](#nodejs)
    - [Network simulator](#network-simulator)
    - [TCP and UDP client/server examples](#tcp-and-udp-clientserver-examples)
    - [Read text file](#read-text-file)
  - [OAuth 2.0](#oauth-20)
    - [OAuth2orize example](#oauth2orize-example)
    - [Express App OAuth 2.0 Social Login](#express-app-oauth-20-social-login)
  - [React/Redux](#reactredux)
    - [Github Favorite Issues](#github-favorite-issues)
    - [React Higher Order Components](#react-higher-order-components)
    - [React Bootstrap Notifications](#react-bootstrap-notifications)
    - [React Hello World](#react-hello-world)
    - [React + Express - Authentication](#react--express---authentication)
    - [React/Redux Blog Comment](#reactredux-blog-comment)
    - [React/Redux Book List](#reactredux-book-list)
    - [React/Redux Middleware](#reactredux-middleware)
    - [React/Redux Weather App](#reactredux-weather-app)
    - [React Youtube](#react-youtube)
    - [Webpack/React Bootstrapper](#webpackreact-bootstrapper)
  - [Tests](#tests)
    - [MyCafe - Cucumber Version](#mycafe---cucumber-version)
    - [MyCafe - Mocha Version](#mycafe---mocha-version)
    - [Supertest](#supertest)    

## Algorithms
*Code snippets that demonstrates basic concepts of algorithms, data structures, design techniques and advanced topics:*

#### A* Pathfinding Example

This application demonstrates how to use the A* algorithm to find the best path within a graph (a matrix in this example). The agent (A) walks the map vertically cleaning all the dirt spots (s) that it finds. If its fuel level goes too low (below 30) then it uses the A* to find the nearest fuel station \(R\). After refueling it returns to the original spot and continues its linear map cleansing. If at any moment the garbage capacity reaches 0 then the agent uses A* again to find the nearest garbage can to dispose of the garbage.

### Hacker Rank

*Exercises from Hacker Rank*

#### Arrays Left Rotation

Given an array of  integers and a number, perform  left rotations on the array. Then print the updated array as a single line of space-separated integers.

### Codility

*Exercises from Codility*

#### Lesson 1 - Binary Gap

Write a function that given a positive integer N, returns the length of its longest binary gap. The function should return 0 if N doesn't contain a binary gap.

#### Lesson 2 - Odd Occurrences in Array

Write a function that, given an array A consisting of N integers fulfilling the above conditions, returns the value of the unpaired element.

#### Lesson 2 - Cyclic Rotation

Write a function that, given a zero-indexed array A consisting of N integers and an integer K, returns the array A rotated K times.

## Chrome Extensions

*Google Chrome extension examples.*

#### Google Custom Search Chrome Extension

An adaptation from the official Chrome Extension tutorial (https://developer.chrome.com/extensions/getstarted) -- the old Google Images API is not supported anymore so this example uses the Google Custom Search API. When the extension icon is clicked a query is made to the GCS API with the current URL and the results are displayed in an unordered list, in the extension HTML popup.

## Configuration Management

*From wikipedia's definition: "configuration management is a systems engineering process for establishing and maintaining consistency of a product's performance, functional, and physical attributes with its requirements, design, and operational information throughout its life."*

*In the full stack JavaScript development context tools such as **browserify**, **forever**, **grunt**, **webpack** are related to configuration management processes.*

#### Browserify

A simple app, with a single page, that generates a random color and sets the background to that color. It demonstrates how to use the npm package 'random-color' in a HTML JavaScript code via 'browserify'.In package.json the script "build-my-js" executes the command to compile the original js code to the resulting js file that can be used in the browser.

Browserify is a tool for packaging JavaScript that allows you to use the require function just like you do in Node. It lets you easily define modules. If Browserify sees that evan.js requires cake.js and burrito.js, it’ll package up cake.js and burrito.js and concatenate them into the compiled output file. Both Node-based and browser-based JavaScript can require Node modules, letting you share code between server and client with no extra work.

#### Forever

Tutorial from 'Express in Action' by Evan Hahn. Forever is a module that keeps your apps running forever -- if your app crashes, Forever will try to restart it. Changed the 'start' script to 

```javascript
    "scripts": {
        "start": "forever app.js"
        ...
    },
    ...
```

#### Grunt

Grunt, "The JavaScript Task Runner," runs tasks. If you’ve ever used Make or Rake, Grunt will seem familiar. These tasks include compiling CoffeeScript or LESS or SASS, concatenating JavaScript and CSS, running tests, and plenty more. Depending on the projects needs, a specific set of Grunt plugins will be installed.

#### Webpack with Express

Demonstration on how to use webpack-dev-middleware in an Express application.

#### Webpack loaders

This snippet shows how to configure webpack loaders for handling ES6 syntax, CSS and images. It also introduces http://lorempixel.com, a nice provider of placeholder images.

#### Webpack code splitting

This snippet shows how to use System.import along with module.default() to make webpack split the bundle and optimize loading performance.

#### Webpack simple example

Shows how to configure a simple webpack.config.js file specifying an entry point and configuring the resulting file's name and path.

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

#### Webpack static website

This example shows how to use a webpack configuration that will add two bundles -- one for the application code and one for the dependencies. This is useful for preventing the browser to download a single, big bundle.js file everytime the user opens the application.

## Express

*Express, is a web application framework for Node.js. It is designed for building web applications and APIs. It is the de facto standard server framework for Node.js.*

### Express Web App

Tutorial from 'Express in Action' by Evan Hahn. A simple Express web application that uses EJS (Embedded JavaScript templates) as the view engine. It provides an endpoint for the JS client to consume. The server uses forecastio to search weather data for the informed (american) ZIP code.

## Fundamentals

*Snippets for demonstrating basic concepts of JavaScript such as new features introduced in ES6.*

#### Promises click game

Click 6 times before the 2 second time limit. A simple example to demonstrate the behavior of the Promise object.

## Games

*Simple games developed with JavaScript.*

#### Multiplayer Node.js Game Tutorial

Tutorial from https://rainingchain.com/tutorial/nodejs by Samuel Magnan-Levesque. It uses Socket.io.

#### Phaser Express Basic

Tutorial from 'An Introduction to HTML5 Game Development with PhaserJS' by Travis Faas. It's a simple express application that serves a PhaserJS game. Move the character around to capture the cat and increment the score.

## Mongoose

*Mongoose is an ORM for Mongo, written in Node.js.*

#### Simple Blog

From 'The Complete Developer's Guide to MongoDB', by Stephen Grider. A simple blog back-end structure with Mongoose. 

#### Electron app

From https://github.com/StephenGrider/UpStarMusic.git. An electron app for display a catalog of artists and albums. 

## Node.js

*Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side.*

#### Network simulator

Simulates a network of routers/machines -- run one program-router and a set of program-machine instances in a real machine and another program-router and program-machine set in another real machine (the real machines must be in the same real local network). When executing a program-machine it will display a simple menu that allows messages (packages) to be sent to another program-machine.

#### TCP and UDP client/server examples

A simple pair of client/server programs using both TCP and UDP protocols.

#### Read text file

A simple example on how to read a txt file in Node.js

## OAuth 2.0

*OAuth is an open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords.*

#### OAuth2orize example

This application demonstrates how to use oauth2orize along with the passport module to implement 3 (out of 4) OAuth 2.0 authorization grants

* authorization code
* implicit
* password credentials

#### Express App OAuth 2.0 Social Login

Tutorial from https://scotch.io/tutorials/easy-node-authentication-setup-and-local. A simple Express application that demonstrates how to use the following Passport strategies:

* LocalStrategy
* FacebookStrategy
* TwitterStrategy
* GoogleStrategy

## React/Redux

*React is a JavaScript library for building user interfaces. Redux is an open-source JavaScript library designed for managing application state.*

#### Github Favorite Issues

This application enables the user to search for GitHub issues and mark them as favorites.

#### React Higher Order Components

A higher order component adds additional behavior to an pre-existing component

#### React Bootstrap Notifications

Demonstrates how to use React-Bootstrap and React Bootstrap Notifier

#### React Hello World

From "Pro MERN Stack" by Vasan Subramanian. Demonstrates the basics of how React applications can be built. Includes a simple piece of code written React JSX, babel packages/scripts and uses ES2015.

#### React + Express - Authentication

Tutorial from Udemy's 'Advanced React and Redux' by Stephen Grider. It's a complete example of how to create an protected API with Express and Passport and how to consume it with a React client.

#### React/Redux Blog Comment

Demonstrates how to create tests using Mocha and Chai for React components, action creators and reducers.

#### React/Redux Book List

A simple detail/list application to demonstrate basic concepts of Redux. 

#### React/Redux Middleware

Tutorial from Udemy's 'Advanced React and Redux' by Stephen Grider. Fetches a list of users from a fake REST API and use a middleware to resolve the promise within the action before sending to all reducers.

#### React/Redux Weather App

A React app that where the user can search for weather data for a particular location.

#### React Youtube

An youtube-like app that demonstrates basic concepts of React.

#### Webpack/React Bootstrapper

A bootstrapper project with a composed webpack configuration and a minimum React setup.

## Tests

*Snippets demonstrating several tools used for testing JavaScript applications.*

#### MyCafe - Cucumber Version

From the book "Learning BDD with JS" by Enrique Amodeo. Uses Cucumber, Chai and Sinon to implement the tests using the BDD methodology. The actual implementation is an exercise proposed in the book.

#### MyCafe - Mocha Version

From the book "Learning BDD with JS" by Enrique Amodeo. Uses Mocha, Chai and Sinon to implement the tests using the BDD methodology. The actual implementation is an exercise proposed in the book.

#### Supertest

From the book "Express in Action" by Evan M Hahn. This application uses the 'supertest' module to make integration tests on an Express API. 


