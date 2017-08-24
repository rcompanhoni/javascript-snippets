# Simple Blog

From 'The Complete Developer's Guide to MongoDB', by Stephen Grider.  A simple blog back-end structure with Mongoose. It includes:
    * Mongoose core operations (CRUD)
    * Handling subdocuments
    * Virtual types -- a virtual type (or field) is a computed property based on some other property. In this example UserSchema.postCount is a computed property that uses posts.length. Note that the virtual field it's not actually present in the Mongo database.
    * Referencing other schemas: in the association_test file, the 'populate' modifier is used to load the complete reference (analogous to MS Entity Framework 'Include').
    * The UserSchema uses the 'pre' hook on the 'remove' method -- this is used to include some integrity to the DB by removing any related blog posts of the user being deleted.

MODULES/PACKAGES USED

* *mocha*: a feature-rich JavaScript test framework running on Node.js and in the browser
* *nodemon*: for use during development of a node.js based application. Nodemon will watch the files in the directory in which nodemon was started, and if any files change nodemon will automatically restart your node application.
* *mongoose*: a MongoDB object modeling tool designed to work in an asynchronous environment.