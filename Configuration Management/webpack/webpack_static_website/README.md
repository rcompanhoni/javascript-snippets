# WEBPACK STATIC WEBSITE

From Stephen Grider's Webpack 2: The Complete Developer's Guider. This example shows how to use a webpack configuration that will add two bundles -- one for the application code and one for the dependencies. This is useful for preventing the browser to download a single, big bundle.js file everytime the user opens the application.

### HOW TO RUN THE APPLICATION

* You can use the 'standalone' webpack version with the command *npm run build* which will create the output in the *'dist'* folder.
* Alternatively, you can use *npm run serve* which will use webpack-dev-server that manages the output content in memory.

### WEBPACK CODE SPLITTING AND REACT ROUTER

This application defines a routing component which uses **System.import** to load the appropriate React component for each route. Using this approach allows webpack to
split the bundle, optimizing the page loading time.

### DEPLOYMENT

#### SURGE
* Install surge CLI: npm install -g surge
* Run webpack to generate the updated output folder: npm run build
* Deploy with surge -p << FOLDER TO DEPLOY >> , for example surge -p dist (this will ask you to create an account or log in right in the command line)

#### GITHUB PAGES

When you push contents to the special branch named gh-pages Github will automatically publish its contents to https://<Username>.github.io/<RepoName>

* STEP 01 - create a new Github repository
* STEP 02 - create a Git repository locally in the project folder with git init
* STEP 03 - add and commit the contents with git add .  followed by git commit -m "Initial Commit"
* STEP 04 - configure the remote with git remote add origin <REMOTE>
* STEP 05 - create the special branch with git checkout -b gh-pages
* STEP 06 - push the webpack output folder to the origin. To push just a the specific folder dist to the remote branch use git subtree push --prefix dist origin gh-pages
* STEP 07 - access https://<Username>.github.io/<RepoName> to see the published website.

Also, notice that a script "deploy" was added with "npm run build && git subtree push --prefix dist origin gh-pages"

#### AWS S3

AWS will charge you depending on the usage -- for a simple example it should be way below their free limit but you should be extremely careful with the generated API keys -- don't publish them on Github.
* STEP 01 - Creates a 'AWS bucket' where the application will be deployed to: npm install -g s3-website
* STEP 02 - In AWS console, in 'My Security Credentials', enter in 'Access Keys' and then 'Create New Access Key'
* STEP 03 - In your project, add a file named .env
```
*AWS_ACCESS_KEY_ID=wdasdadasddaddsada*
*AWS_SECRET_ACCESS_KEY=wdasdadasddaddsada*
```

* STEP 04 - Create a bucket with the command s3-website create webpack-deploy
* STEP 05 - Deploy the contents folder (webpack output) with s3-website deploy dist

### PACKAGES USED

* **CommonsChunkPlugin**: used in order to specify that everything that is in the bundle 'vendor.js' will not be included (again) in the main bundle.js file
* **html-webpack-plugin**: automatically includes the generated bundle files in the index.html file.
* **rimraf**: to delete a folder in one of the package.json scripts. In this app, webpack is continuously adding bundles with hashed names to the 'dist' folder. By using rimraf we ensure that the contents of dist are always deleted when running npm run build. We could use some specific OS command instead of rimraf but by using it we make the script OS agnostic (see scripts in package.json)
* **webpack-dev-server**: Use webpack with a development server that provides live reloading. This should be used for **development only**.
