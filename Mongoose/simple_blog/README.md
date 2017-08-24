# Simple Blog

Demonstrates how to reference entities in Mongoose schemas. Some notes:
    * In the association_test the populate modifier is used to load the complete reference (analogous to MS Entity Framework 'Include').
    * The UserSchema uses the 'pre' hook on the 'remove' method -- this is used to include some integrity to the DB by removing any related blog posts of the user being deleted.

MODULES/PACKAGES USED

* *mocha*: a feature-rich JavaScript test framework running on Node.js and in the browser
* *nodemon*: for use during development of a node.js based application. Nodemon will watch the files in the directory in which nodemon was started, and if any files change nodemon will automatically restart your node application.
* *mongoose*: a MongoDB object modeling tool designed to work in an asynchronous environment.