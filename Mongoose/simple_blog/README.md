# virtual types

A virtual type (or field) is a computed property based on some other property. In this example UserSchema.postCount is a computed property that uses posts.length. Note that the virtual field it's not actually present in the Mongo database.

MODULES/PACKAGES USED

* *mocha*: a feature-rich JavaScript test framework running on Node.js and in the browser
* *nodemon*: for use during development of a node.js based application. Nodemon will watch the files in the directory in which nodemon was started, and if any files change nodemon will automatically restart your node application.
* *mongoose*: a MongoDB object modeling tool designed to work in an asynchronous environment.