# EXPRESS APPLICATION WITH WEBPACK MIDDLEWARE

From Stephen Grider's Webpack 2: The Complete Developer's Guider. This example demonstrates how to use webpack-dev-middleware in an Express application.

### DEPLOYMENT

#### HEROKU

* STEP 01: Add the Procfile file to the project -- this file is used by Heroku to (among other things) execute the initialization script: 
```
web: node server.js
```		
* STEP 02: Create a local git repository (if not yet created) and add/commit everything -- *git init*, *git add .* , *git commit -m "Initial Commit"*
* STEP 03: Create a Heroku account and install Heroku CLI. After that run the command heroku login to sign in to the Heroku account
* STEP 04: run heroku create to create a new Heroku application (this already configures the local git repository with the Heroku remotes -- see them with *git remote -v*)
* STEP 05: deploy with *git push heroku master* -- check for problems with *heroku logs*
* STEP 06: Open the app with *heroku open*

#### AWS ELASTIC BEANSTALK

Appropriate for applications that expect to dynamically scale as the app requires more resources

* STEP 01: Install elastic beanstalk CLI
* STEP 02: run *eb init* -- this will start a wizard for configuring the application (get the keys from the AWS console)
* STEP 03: run *eb create* -- starts a wizard that will end up deploying the application in the previously configured environment
* STEP 04: run *eb setenv NODE_ENV=production*
* STEP 05: run *eb open*
* STEP 06 (optional): run *eb terminate* if you want to delete the application


### PACKAGES USED

* **webpack-dev-middleware**: It's a simple wrapper middleware for webpack. It serves the files emitted from webpack over a connect server. This should be used for development only.
