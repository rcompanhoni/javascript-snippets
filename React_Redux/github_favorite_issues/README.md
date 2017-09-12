# Github Favorite Issues

This application enables the user to search for GitHub issues and mark them as favorites. It's implemented with React/Redux -- the following diagram illustrates the data flow when a user searches for a repository issues:

<br><br>

![redux](https://user-images.githubusercontent.com/5614733/28279317-7fa5dd26-6af6-11e7-89e7-a6334d66f972.png)


### How to run the application

* Clone/download the application
* Install dependencies with **npm install**
* Run the application with **npm start** (default port is 3000)

### About the tests

You can either use the command **npm test** to run the test suite once or **npm run test:watch** to run it in watch mode.

* **jsdom**: sets up in the test environment a browser emulator
* **mocha**: test runner that can be executed from Node as well as inside a browser
* **chai-jquery**: Library for assertions, to be used along with Mocha. Chai-only assertions work fine for BE assertions, but using jQuery selector allows us to make assertions on the React components

